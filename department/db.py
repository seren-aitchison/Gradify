import sqlite3
import os
import json
import time
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "state", "gradify_department.db")

def get_connection():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=10.0)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    c = conn.cursor()

    # Tasks table
    c.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        stage TEXT NOT NULL DEFAULT 'init',
        pipeline TEXT,
        assigned_agent TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending', -- pending, working, review, completed, blocked
        branch TEXT,
        worktree TEXT,
        result TEXT,
        metadata TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Messages table (inter-agent communication)
    c.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER,
        sender_agent TEXT NOT NULL,
        recipient_agent TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks(id)
    )
    """)

    # Event log (for dashboard and audit trail)
    c.execute("""
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        agent TEXT NOT NULL,
        action TEXT NOT NULL,
        details TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Agent heartbeats & state
    c.execute("""
    CREATE TABLE IF NOT EXISTS agent_status (
        agent_id TEXT PRIMARY KEY,
        status TEXT NOT NULL DEFAULT 'offline', -- offline, idle, thinking, working, waiting_review
        current_task_id INTEGER,
        last_heartbeat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_tasks_completed INTEGER DEFAULT 0
    )
    """)

    conn.commit()
    conn.close()

def create_task(title, description, assigned_agent, pipeline=None, branch=None, worktree=None, metadata=None):
    conn = get_connection()
    c = conn.cursor()
    c.execute("""
    INSERT INTO tasks (title, description, assigned_agent, pipeline, branch, worktree, metadata, status, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP)
    """, (title, description, assigned_agent, pipeline, branch, worktree, json.dumps(metadata) if metadata else None))
    task_id = c.lastrowid
    conn.commit()
    conn.close()
    log_event("orchestrator", "task_created", f"Task #{task_id} '{title}' assigned to {assigned_agent}")
    return task_id

def get_task(task_id):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    row = c.fetchone()
    conn.close()
    return dict(row) if row else None

def get_pending_task_for_agent(agent_role):
    conn = get_connection()
    c = conn.cursor()
    c.execute("""
    SELECT * FROM tasks
    WHERE assigned_agent = ? AND status IN ('pending', 'working')
    ORDER BY id ASC LIMIT 1
    """, (agent_role,))
    row = c.fetchone()
    conn.close()
    return dict(row) if row else None

def update_task_status(task_id, status, result=None):
    conn = get_connection()
    c = conn.cursor()
    if result is not None:
        c.execute("""
        UPDATE tasks SET status = ?, result = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
        """, (status, result, task_id))
    else:
        c.execute("""
        UPDATE tasks SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
        """, (status, task_id))
    conn.commit()
    conn.close()

def handoff_task(task_id, from_agent, to_agent, next_stage, note=""):
    conn = get_connection()
    c = conn.cursor()
    c.execute("""
    UPDATE tasks
    SET assigned_agent = ?, stage = ?, status = 'pending', updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    """, (to_agent, next_stage, task_id))
    conn.commit()
    conn.close()
    log_event(from_agent, "task_handoff", f"Task #{task_id} handed off to {to_agent} (Stage: {next_stage}). Note: {note}")
    send_message(task_id, from_agent, to_agent, f"Task #{task_id} handed off to you for stage '{next_stage}'. {note}")

def send_message(task_id, sender, recipient, content):
    conn = get_connection()
    c = conn.cursor()
    c.execute("""
    INSERT INTO messages (task_id, sender_agent, recipient_agent, content)
    VALUES (?, ?, ?, ?)
    """, (task_id, sender, recipient, content))
    conn.commit()
    conn.close()

def get_messages(task_id=None, limit=20):
    conn = get_connection()
    c = conn.cursor()
    if task_id:
        c.execute("SELECT * FROM messages WHERE task_id = ? ORDER BY id DESC LIMIT ?", (task_id, limit))
    else:
        c.execute("SELECT * FROM messages ORDER BY id DESC LIMIT ?", (limit,))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def log_event(agent, action, details):
    conn = get_connection()
    c = conn.cursor()
    c.execute("""
    INSERT INTO events (agent, action, details) VALUES (?, ?, ?)
    """, (agent, action, details))
    conn.commit()
    conn.close()

def get_recent_events(limit=30):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM events ORDER BY id DESC LIMIT ?", (limit,))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def update_heartbeat(agent_id, status, current_task_id=None, task_completed=False):
    conn = get_connection()
    c = conn.cursor()
    if task_completed:
        c.execute("""
        INSERT INTO agent_status (agent_id, status, current_task_id, last_heartbeat, total_tasks_completed)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, 1)
        ON CONFLICT(agent_id) DO UPDATE SET
            status = excluded.status,
            current_task_id = excluded.current_task_id,
            last_heartbeat = CURRENT_TIMESTAMP,
            total_tasks_completed = agent_status.total_tasks_completed + 1
        """, (agent_id, status, current_task_id))
    else:
        c.execute("""
        INSERT INTO agent_status (agent_id, status, current_task_id, last_heartbeat, total_tasks_completed)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0)
        ON CONFLICT(agent_id) DO UPDATE SET
            status = excluded.status,
            current_task_id = excluded.current_task_id,
            last_heartbeat = CURRENT_TIMESTAMP
        """, (agent_id, status, current_task_id))
    conn.commit()
    conn.close()

def get_all_agents():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM agent_status ORDER BY agent_id ASC")
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]

def get_all_tasks(limit=50):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM tasks ORDER BY id DESC LIMIT ?", (limit,))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]

# Initialize tables on import
init_db()
