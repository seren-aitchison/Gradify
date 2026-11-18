#!/usr/bin/env python3
import sys
import os
import argparse
import json
from db import (
    create_task,
    get_task,
    get_all_tasks,
    get_all_agents,
    get_recent_events,
    get_messages,
    log_event
)

ROLES_PATH = os.path.join(os.path.dirname(__file__), "roles.json")
with open(ROLES_PATH, "r") as f:
    ROLES_CONFIG = json.load(f)

# ANSI Colors
C_BOLD = "\033[1m"
C_DIM = "\033[2m"
C_RESET = "\033[0m"
C_CYAN = "\033[96m"
C_GREEN = "\033[92m"
C_YELLOW = "\033[93m"
C_RED = "\033[91m"
C_BLUE = "\033[94m"

def cmd_status():
    agents = {a["agent_id"]: a for a in get_all_agents()}
    tasks = get_all_tasks(limit=100)
    pending_count = len([t for t in tasks if t["status"] == "pending"])
    working_count = len([t for t in tasks if t["status"] == "working"])
    completed_count = len([t for t in tasks if t["status"] == "completed"])

    print(f"\n{C_BOLD}═══════════════════════════════════════════════════════════════════════════{C_RESET}")
    print(f"{C_BOLD}          GRADIFY AI DEPARTMENT · CENTRAL ORCHESTRATOR STATUS             {C_RESET}")
    print(f"{C_BOLD}═══════════════════════════════════════════════════════════════════════════{C_RESET}")
    print(f"Tasks: {C_YELLOW}{pending_count} pending{C_RESET} │ {C_BLUE}{working_count} working{C_RESET} │ {C_GREEN}{completed_count} completed{C_RESET}\n")

    print(f"{C_BOLD}TERMINAL AGENTS ROSTER (8 SPECIALISTS):{C_RESET}")
    print("  #  ROLE ID       AGENT NAME                         STATUS      TASKS DONE  ACTIVE TASK")
    print(" ─── ───────────── ────────────────────────────────── ─────────── ────────── ───────────")

    for role_id, info in ROLES_CONFIG.items():
        st = agents.get(role_id, {})
        status = st.get("status", "offline")
        tasks_done = st.get("total_tasks_completed", 0)
        curr_task = st.get("current_task_id")
        task_str = f"#{curr_task}" if curr_task else "-"

        if status == "working" or status == "thinking":
            status_col = f"{C_BLUE}{status.upper():11}{C_RESET}"
        elif status == "idle":
            status_col = f"{C_GREEN}{status.upper():11}{C_RESET}"
        else:
            status_col = f"{C_DIM}{status.upper():11}{C_RESET}"

        term_num = str(info["terminal"]).rjust(2)
        print(f" {term_num}  {role_id.ljust(13)} {info['name'][:34].ljust(34)} {status_col} {str(tasks_done).rjust(10)}  {task_str}")

    print(f"\n{C_BOLD}RECENT ORCHESTRATION EVENTS:{C_RESET}")
    events = get_recent_events(limit=8)
    if not events:
        print(f"  {C_DIM}No events recorded yet.{C_RESET}")
    for e in events:
        print(f"  {C_DIM}[{e['timestamp']}]{C_RESET} {C_BOLD}[{e['agent'].upper()}]{C_RESET} {e['action']}: {e['details']}")
    print()

def cmd_create_task(args):
    task_id = create_task(
        title=args.title,
        description=args.desc,
        assigned_agent=args.role,
        pipeline=args.pipeline or "custom"
    )
    print(f"\n{C_GREEN}✓ Task #{task_id} successfully created!{C_RESET}")
    print(f"  Title: {args.title}")
    print(f"  Assigned Agent: Terminal #{ROLES_CONFIG[args.role]['terminal']} ({args.role.upper()})")
    print(f"  Pipeline: {args.pipeline or 'standalone'}\n")

def cmd_pipeline(args):
    p_type = args.type
    topic = args.topic or "Machine Learning Fundamentals"

    if p_type == "new-course":
        # Multi-agent curriculum pipeline
        desc = f"Design and map the complete syllabus for new course: '{topic}'. Identify 3 units, 6 lessons, prerequisite concept links, and Bloom levels."
        t1 = create_task(
            title=f"Curriculum Map: {topic}",
            description=desc,
            assigned_agent="curriculum",
            pipeline="new-course"
        )
        print(f"{C_GREEN}✓ Dispatched Stage 1 to CURRICULUM INTELLIGENCE (Task #{t1}){C_RESET}")
        print(f"  Pipeline Flow: Curriculum -> Pedagogy -> Assessment -> QA -> Engineering")

    elif p_type == "benchmark-test":
        desc = "Run benchmark suite (scripts/bench.mjs), verify BKT AUC and FSRS precision, and report findings."
        t1 = create_task(
            title="Evaluate Adaptive Algorithms Benchmark",
            description=desc,
            assigned_agent="research",
            pipeline="benchmark"
        )
        print(f"{C_GREEN}✓ Dispatched benchmark evaluation to RESEARCH & INNOVATION (Task #{t1}){C_RESET}")

    elif p_type == "security-audit":
        desc = "Audit Row-Level Security policies and payment boundaries in supabase/migrations/ and kit/data/."
        t1 = create_task(
            title="Comprehensive Security & RLS Audit",
            description=desc,
            assigned_agent="security",
            pipeline="security-audit"
        )
        print(f"{C_GREEN}✓ Dispatched security audit to SECURITY & INFRASTRUCTURE (Task #{t1}){C_RESET}")

def cmd_tasks():
    tasks = get_all_tasks(limit=30)
    print(f"\n{C_BOLD}GRADIFY DEPARTMENT TASKS (Recent 30):{C_RESET}")
    print("  ID   STATUS     AGENT        STAGE        TITLE")
    print(" ──── ────────── ──────────── ──────────── ────────────────────────────────────")
    for t in tasks:
        st = t["status"]
        if st == "completed":
            st_col = f"{C_GREEN}{st.ljust(10)}{C_RESET}"
        elif st == "working":
            st_col = f"{C_BLUE}{st.ljust(10)}{C_RESET}"
        elif st == "pending":
            st_col = f"{C_YELLOW}{st.ljust(10)}{C_RESET}"
        else:
            st_col = f"{C_RED}{st.ljust(10)}{C_RESET}"

        print(f" #{str(t['id']).rjust(3)} {st_col} {t['assigned_agent'].ljust(12)} {t['stage'][:12].ljust(12)} {t['title'][:40]}")
    print()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gradify Department Orchestrator")
    subparsers = parser.add_subparsers(dest="command")

    # status
    p_status = subparsers.add_parser("status", help="Show live status of all 8 agents")

    # tasks
    p_tasks = subparsers.add_parser("tasks", help="List all department tasks")

    # create-task
    p_create = subparsers.add_parser("create-task", help="Create a task for an agent")
    p_create.add_argument("--role", required=True, choices=list(ROLES_CONFIG.keys()), help="Target agent role")
    p_create.add_argument("--title", required=True, help="Task title")
    p_create.add_argument("--desc", required=True, help="Task instructions")
    p_create.add_argument("--pipeline", default="manual", help="Pipeline name")

    # pipeline
    p_pipe = subparsers.add_parser("pipeline", help="Trigger an automated multi-agent workflow pipeline")
    p_pipe.add_argument("--type", required=True, choices=["new-course", "benchmark-test", "security-audit"], help="Pipeline type")
    p_pipe.add_argument("--topic", default="Organic Chemistry", help="Topic name")

    args = parser.parse_args()

    if args.command == "status" or not args.command:
        cmd_status()
    elif args.command == "tasks":
        cmd_tasks()
    elif args.command == "create-task":
        cmd_create_task(args)
    elif args.command == "pipeline":
        cmd_pipeline(args)
