#!/usr/bin/env python3
import sys
import os
import time
import json
import argparse
from http.server import HTTPServer, BaseHTTPRequestHandler
import threading

from db import (
    get_all_agents,
    get_all_tasks,
    get_recent_events,
    get_messages
)

ROLES_PATH = os.path.join(os.path.dirname(__file__), "roles.json")
with open(ROLES_PATH, "r") as f:
    ROLES_CONFIG = json.load(f)

C_BOLD = "\033[1m"
C_DIM = "\033[2m"
C_RESET = "\033[0m"
C_CYAN = "\033[96m"
C_GREEN = "\033[92m"
C_YELLOW = "\033[93m"
C_RED = "\033[91m"
C_BLUE = "\033[94m"
C_CLEAR = "\033[2J\033[H"

def render_terminal_dashboard():
    while True:
        agents = {a["agent_id"]: a for a in get_all_agents()}
        tasks = get_all_tasks(limit=10)
        events = get_recent_events(limit=6)
        messages = get_messages(limit=4)

        pending = len([t for t in tasks if t["status"] == "pending"])
        working = len([t for t in tasks if t["status"] == "working"])
        completed = len([t for t in tasks if t["status"] == "completed"])

        now_str = time.strftime("%Y-%m-%d %H:%M:%S")

        buf = []
        buf.append(C_CLEAR)
        buf.append(f"{C_BOLD}{C_CYAN}╔══════════════════════════════════════════════════════════════════════════════════════╗{C_RESET}")
        buf.append(f"{C_BOLD}{C_CYAN}║                     GRADIFY AI DEPARTMENT · 8-AGENT LIVE MONITOR                     ║{C_RESET}")
        buf.append(f"{C_BOLD}{C_CYAN}╚══════════════════════════════════════════════════════════════════════════════════════╝{C_RESET}")
        buf.append(f"{C_DIM}Time:{C_RESET} {now_str}  │  {C_DIM}Engine:{C_RESET} Ollama (qwen2.5-coder:3b)  │  {C_DIM}Tasks:{C_RESET} {C_YELLOW}{pending} pending{C_RESET}, {C_BLUE}{working} working{C_RESET}, {C_GREEN}{completed} done{C_RESET}\n")

        buf.append(f"{C_BOLD}SPECIALIST AGENTS ROSTER (8 TERMINALS):{C_RESET}")
        buf.append("┌────┬──────────────┬──────────────────────────────────┬─────────────┬───────────┬─────────────┐")
        buf.append("│ T# │ ROLE         │ RESPONSIBILITY                   │ STATUS      │ COMPLETED │ ACTIVE TASK │")
        buf.append("├────┼──────────────┼──────────────────────────────────┼─────────────┼───────────┼─────────────┤")

        for role_id, info in ROLES_CONFIG.items():
            st = agents.get(role_id, {})
            status = st.get("status", "offline")
            completed_n = st.get("total_tasks_completed", 0)
            curr_task = st.get("current_task_id")
            task_str = f"#{curr_task}" if curr_task else "-"

            if status == "working" or status == "thinking":
                status_styled = f"{C_BLUE}{status.upper():11}{C_RESET}"
            elif status == "idle":
                status_styled = f"{C_GREEN}{status.upper():11}{C_RESET}"
            else:
                status_styled = f"{C_DIM}{status.upper():11}{C_RESET}"

            t_num = str(info["terminal"]).rjust(2)
            role_str = role_id[:12].ljust(12)
            resp_str = info["responsibility"][:32].ljust(32)
            comp_str = str(completed_n).rjust(9)
            act_str = task_str.center(11)

            buf.append(f"│ {t_num} │ {role_str} │ {resp_str} │ {status_styled} │ {comp_str} │ {act_str} │")

        buf.append("└────┴──────────────┴──────────────────────────────────┴─────────────┴───────────┴─────────────┘\n")

        buf.append(f"{C_BOLD}RECENT INTER-AGENT MESSAGES & HANDOFFS:{C_RESET}")
        if not messages:
            buf.append(f"  {C_DIM}(No inter-agent messages logged yet){C_RESET}")
        for m in messages:
            buf.append(f"  {C_CYAN}[Task #{m['task_id']}]{C_RESET} {C_BOLD}{m['sender_agent'].upper()}{C_RESET} ➔ {C_BOLD}{m['recipient_agent'].upper()}{C_RESET}: {m['content'][:70]}")
        buf.append("")

        buf.append(f"{C_BOLD}ACTIVE PIPELINE & TASK QUEUE:{C_RESET}")
        if not tasks:
            buf.append(f"  {C_DIM}(No tasks in queue){C_RESET}")
        for t in tasks[:5]:
            st = t["status"]
            st_badge = f"{C_GREEN}[DONE]{C_RESET}" if st == "completed" else f"{C_BLUE}[WORK]{C_RESET}" if st == "working" else f"{C_YELLOW}[WAIT]{C_RESET}"
            buf.append(f"  {st_badge} #{t['id']} ({t['assigned_agent']}): {t['title'][:55]}")

        buf.append(f"\n{C_DIM}Auto-refreshing every 2s. Press Ctrl+C to exit dashboard.{C_RESET}")

        sys.stdout.write("\n".join(buf) + "\n")
        sys.stdout.flush()
        time.sleep(2)

# Web Dashboard Server (HTML/JS)
class DashboardHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/data":
            agents = {a["agent_id"]: a for a in get_all_agents()}
            tasks = get_all_tasks(limit=30)
            events = get_recent_events(limit=20)
            messages = get_messages(limit=15)
            data = {
                "roles": ROLES_CONFIG,
                "agents": agents,
                "tasks": tasks,
                "events": events,
                "messages": messages,
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
            }
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(data).encode("utf-8"))
            return

        # Serve Dashboard HTML
        html = """<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Gradify AI Department · Command Center</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #09090b;
      --card: #121215;
      --line: rgba(255,255,255,0.1);
      --spectrum: linear-gradient(90deg, #4641ff, #8c27ca 20%, #f055dd 38%, #e52153 54%, #ff5600 70%, #ffc002 84%, #40d4b1);
      --font: 'Geist', -apple-system, sans-serif;
      --mono: 'Geist Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: #fff; font-family: var(--font); padding: 32px; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--line); padding-bottom: 20px; margin-bottom: 28px; }
    h1 { font-size: 24px; font-weight: 800; display: flex; align-items: center; gap: 12px; }
    .badge { background: rgba(255,255,255,0.08); border: 1px solid var(--line); border-radius: 999px; padding: 4px 12px; font-size: 12px; font-family: var(--mono); }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
    .agent-card { background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
    .agent-top { display: flex; justify-content: space-between; align-items: center; }
    .terminal-tag { font-family: var(--mono); font-size: 11px; color: #a1a1aa; }
    .status-pill { font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 999px; }
    .status-working { background: rgba(59,130,246,0.2); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); }
    .status-idle { background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
    .status-offline { background: rgba(255,255,255,0.05); color: #71717a; border: 1px solid rgba(255,255,255,0.1); }
    .agent-name { font-size: 16px; font-weight: 700; }
    .agent-desc { font-size: 12px; color: #a1a1aa; line-height: 1.4; flex: 1; }
    .agent-foot { font-size: 12px; font-family: var(--mono); color: #d4d4d8; border-top: 1px solid var(--line); padding-top: 10px; display: flex; justify-content: space-between; }
    .section-title { font-size: 18px; font-weight: 700; margin-bottom: 16px; }
    .log-box { background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 20px; font-family: var(--mono); font-size: 13px; max-height: 300px; overflow-y: auto; }
    .log-row { padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; gap: 14px; }
    .log-time { color: #71717a; }
    .log-agent { color: #60a5fa; font-weight: 700; }
  </style>
</head>
<body>
  <header>
    <h1>
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="9" fill="#18181b"/><path d="M22 10A8 8 0 1 0 24 16H16" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>
      Gradify AI Department · Command Center
    </h1>
    <div style="display:flex; gap:12px; align-items:center;">
      <span class="badge" id="clock">Syncing...</span>
      <span class="badge" style="background:#10b981; color:#000; font-weight:700;">8 TERMINALS</span>
    </div>
  </header>

  <div class="section-title">Specialist Agents (Ollama: qwen2.5-coder:3b)</div>
  <div class="grid" id="agents-grid"></div>

  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
    <div>
      <div class="section-title">Inter-Agent Message Feed</div>
      <div class="log-box" id="messages-box"></div>
    </div>
    <div>
      <div class="section-title">Active Task Pipeline</div>
      <div class="log-box" id="tasks-box"></div>
    </div>
  </div>

  <script>
    async function refresh() {
      try {
        const res = await fetch('/api/data');
        const data = await res.json();
        document.getElementById('clock').textContent = data.timestamp;

        // Render agents
        const grid = document.getElementById('agents-grid');
        grid.innerHTML = Object.entries(data.roles).map(([id, r]) => {
          const st = data.agents[id] || { status: 'offline', total_tasks_completed: 0 };
          const statusClass = 'status-' + (st.status === 'working' || st.status === 'thinking' ? 'working' : st.status === 'idle' ? 'idle' : 'offline');
          return `
            <div class="agent-card">
              <div class="agent-top">
                <span class="terminal-tag">TERMINAL ${r.terminal}</span>
                <span class="status-pill ${statusClass}">${st.status}</span>
              </div>
              <div class="agent-name">${r.name.replace(' Agent', '')}</div>
              <div class="agent-desc">${r.responsibility}</div>
              <div class="agent-foot">
                <span>Done: ${st.total_tasks_completed || 0}</span>
                <span>${st.current_task_id ? 'Task #' + st.current_task_id : 'Idle'}</span>
              </div>
            </div>
          `;
        }).join('');

        // Render messages
        const msgBox = document.getElementById('messages-box');
        if (data.messages.length === 0) {
          msgBox.innerHTML = '<div style="color:#71717a">No inter-agent messages yet.</div>';
        } else {
          msgBox.innerHTML = data.messages.map(m => `
            <div class="log-row">
              <span class="log-agent">[${m.sender_agent.toUpperCase()} ➔ ${m.recipient_agent.toUpperCase()}]</span>
              <span>${m.content}</span>
            </div>
          `).join('');
        }

        // Render tasks
        const taskBox = document.getElementById('tasks-box');
        if (data.tasks.length === 0) {
          taskBox.innerHTML = '<div style="color:#71717a">No tasks active.</div>';
        } else {
          taskBox.innerHTML = data.tasks.map(t => `
            <div class="log-row">
              <span style="color:${t.status === 'completed' ? '#34d399' : '#fbbf24'}">[#${t.id} ${t.status.toUpperCase()}]</span>
              <span><strong>${t.assigned_agent}:</strong> ${t.title}</span>
            </div>
          `).join('');
        }
      } catch (e) {
        console.error(e);
      }
    }
    refresh();
    setInterval(refresh, 2000);
  </script>
</body>
</html>
"""
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.end_headers()
        self.wfile.write(html.encode("utf-8"))

def run_web_dashboard(port=8088):
    server = HTTPServer(("0.0.0.0", port), DashboardHandler)
    print(f"\n{C_BOLD}{C_GREEN}✓ Live Web Dashboard running at: http://localhost:{port}{C_RESET}")
    server.serve_forever()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gradify Department Dashboard")
    parser.add_argument("--web", action="store_true", help="Run browser-based web dashboard on http://localhost:8088")
    parser.add_argument("--port", type=int, default=8088, help="Web dashboard port")
    args = parser.parse_args()

    if args.web:
        run_web_dashboard(args.port)
    else:
        render_terminal_dashboard()
