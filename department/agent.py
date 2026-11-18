#!/usr/bin/env python3
import sys
import os
import time
import json
import argparse
import urllib.request
import urllib.error
import subprocess

from db import (
    get_pending_task_for_agent,
    update_task_status,
    handoff_task,
    log_event,
    update_heartbeat,
    get_messages,
    send_message
)

ROLES_PATH = os.path.join(os.path.dirname(__file__), "roles.json")
with open(ROLES_PATH, "r") as f:
    ROLES_CONFIG = json.load(f)

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")
DEFAULT_MODEL = os.environ.get("GRADIFY_AGENT_MODEL", "qwen2.5-coder:3b")

# ANSI Color formatting
COLORS = {
    "cyan": "\033[96m",
    "green": "\033[92m",
    "yellow": "\033[93m",
    "blue": "\033[94m",
    "magenta": "\033[95m",
    "red": "\033[91m",
    "bright_blue": "\033[94;1m",
    "white": "\033[97m",
    "reset": "\033[0m",
    "bold": "\033[1m",
    "dim": "\033[2m"
}

def log_agent(role_id, msg, color="white"):
    c = COLORS.get(color, COLORS["white"])
    now = datetime_now = time.strftime("%H:%M:%S")
    print(f"{COLORS['dim']}[{now}]{COLORS['reset']} {c}{COLORS['bold']}[{role_id.upper()}]{COLORS['reset']} {msg}")

def call_ollama(prompt, system_prompt, model=DEFAULT_MODEL, stream=True):
    url = f"{OLLAMA_URL}/api/generate"
    payload = {
        "model": model,
        "prompt": prompt,
        "system": system_prompt,
        "stream": stream,
        "options": {
            "temperature": 0.2,
            "num_predict": 1024
        }
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})

    try:
        with urllib.request.urlopen(req) as resp:
            full_response = ""
            for line in resp:
                if not line:
                    continue
                part = json.loads(line.decode("utf-8"))
                chunk = part.get("response", "")
                full_response += chunk
                if stream:
                    sys.stdout.write(chunk)
                    sys.stdout.flush()
                if part.get("done", False):
                    break
            if stream:
                print()
            return full_response
    except urllib.error.URLError as e:
        log_agent("system", f"Failed to connect to Ollama at {OLLAMA_URL}: {e}", "red")
        return None

# Tool implementations for the agent
def execute_tool(tool_call, repo_root):
    tool_name = tool_call.get("tool")
    args = tool_call.get("args", {})

    if tool_name == "read_file":
        rel_path = args.get("path", "")
        full_path = os.path.normpath(os.path.join(repo_root, rel_path))
        if not full_path.startswith(repo_root):
            return {"error": "Access denied: path outside workspace"}
        if not os.path.exists(full_path):
            return {"error": f"File not found: {rel_path}"}
        try:
            with open(full_path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read(8000)
            return {"path": rel_path, "content": content}
        except Exception as e:
            return {"error": str(e)}

    elif tool_name == "write_file":
        rel_path = args.get("path", "")
        content = args.get("content", "")
        full_path = os.path.normpath(os.path.join(repo_root, rel_path))
        if not full_path.startswith(repo_root):
            return {"error": "Access denied: path outside workspace"}
        try:
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)
            return {"status": "success", "written_bytes": len(content)}
        except Exception as e:
            return {"error": str(e)}

    elif tool_name == "list_dir":
        rel_path = args.get("path", ".")
        full_path = os.path.normpath(os.path.join(repo_root, rel_path))
        if not os.path.exists(full_path):
            return {"error": "Directory not found"}
        try:
            items = os.listdir(full_path)[:30]
            return {"items": items}
        except Exception as e:
            return {"error": str(e)}

    elif tool_name == "run_command":
        cmd = args.get("command", "")
        # Safe sandbox command execution
        try:
            res = subprocess.run(cmd, shell=True, cwd=repo_root, capture_output=True, text=True, timeout=30)
            return {"stdout": res.stdout[:2000], "stderr": res.stderr[:2000], "code": res.returncode}
        except Exception as e:
            return {"error": str(e)}

    return {"error": f"Unknown tool: {tool_name}"}

def parse_tool_call(response_text):
    # Expects JSON blocks like: ```json {"tool": "read_file", "args": {"path": "..."}} ```
    try:
        if "```json" in response_text:
            snippet = response_text.split("```json")[1].split("```")[0].strip()
            return json.loads(snippet)
        elif "{" in response_text and "}" in response_text:
            start = response_text.find("{")
            end = response_text.rfind("}") + 1
            snippet = response_text[start:end]
            data = json.loads(snippet)
            if "tool" in data:
                return data
    except Exception:
        pass
    return None

def run_agent_loop(role_id, repo_root, single_task_mode=False):
    role_info = ROLES_CONFIG.get(role_id)
    if not role_info:
        print(f"Error: Unknown role '{role_id}'")
        sys.exit(1)

    color = role_info.get("color", "white")
    name = role_info.get("name")
    system_prompt = role_info.get("system_prompt")
    allowed_tools = role_info.get("tools", [])

    print(f"{COLORS['bold']}{COLORS[color]}╔═══════════════════════════════════════════════════════════════════════════╗{COLORS['reset']}")
    print(f"{COLORS['bold']}{COLORS[color]}║  GRADIFY AI DEPARTMENT · TERMINAL {role_info['terminal']} : {name.upper()[:36].ljust(36)} ║{COLORS['reset']}")
    print(f"{COLORS['bold']}{COLORS[color]}╚═══════════════════════════════════════════════════════════════════════════╝{COLORS['reset']}")
    print(f"{COLORS['dim']}Responsibility:{COLORS['reset']} {role_info['responsibility']}")
    print(f"{COLORS['dim']}Active Ollama Model:{COLORS['reset']} {DEFAULT_MODEL} @ {OLLAMA_URL}")
    print(f"{COLORS['dim']}Workspace Root:{COLORS['reset']} {repo_root}")
    print(f"{COLORS['dim']}Listening for assigned tasks... (Press Ctrl+C to stop){COLORS['reset']}\n")

    while True:
        try:
            update_heartbeat(role_id, "idle")
            task = get_pending_task_for_agent(role_id)

            if not task:
                if single_task_mode:
                    log_agent(role_id, "No pending tasks found. Exiting.", color)
                    break
                time.sleep(3)
                continue

            task_id = task["id"]
            title = task["title"]
            desc = task["description"]
            stage = task.get("stage", "init")

            log_agent(role_id, f"⚡ PICKED UP Task #{task_id}: '{title}' (Stage: {stage})", color)
            update_task_status(task_id, "working")
            update_heartbeat(role_id, "working", current_task_id=task_id)

            # Retrieve prior messages on this task
            prior_msgs = get_messages(task_id=task_id, limit=5)
            msg_context = ""
            if prior_msgs:
                msg_context = "\nPrior handoff notes from other agents:\n" + "\n".join([f"- [{m['sender_agent']}]: {m['content']}" for m in reversed(prior_msgs)])

            prompt = f"""You have been assigned Task #{task_id}: {title}

TASK INSTRUCTIONS:
{desc}
{msg_context}

YOUR AVAILABLE TOOLS:
{json.dumps(allowed_tools)}

To call a tool, reply with a JSON object:
```json
{{"tool": "read_file", "args": {{"path": "docs/..."}}}}
```
OR to hand off to another agent when your phase is done:
```json
{{"tool": "delegate_task", "args": {{"to_agent": "qa", "next_stage": "verification", "note": "Please run test suite on newly added module."}}}}
```
OR to mark task as completed:
```json
{{"tool": "finish_task", "args": {{"summary": "Successfully completed task requirements."}}}}
```

Analyze the task and provide your step-by-step reasoning and action."""

            step = 1
            max_steps = 6

            while step <= max_steps:
                print(f"\n{COLORS['dim']}─── Step {step}/{max_steps} ───{COLORS['reset']}")
                update_heartbeat(role_id, "thinking", current_task_id=task_id)
                response = call_ollama(prompt, system_prompt, stream=True)

                if not response:
                    log_agent(role_id, "Model gave empty response or Ollama connection failed.", "red")
                    update_task_status(task_id, "blocked", "Ollama connection failed")
                    break

                tool_call = parse_tool_call(response)

                if tool_call:
                    t_name = tool_call.get("tool")
                    t_args = tool_call.get("args", {})
                    log_agent(role_id, f"Executing tool: {t_name} with args {t_args}", "dim")

                    if t_name == "delegate_task":
                        to_agent = t_args.get("to_agent")
                        next_stage = t_args.get("next_stage", "review")
                        note = t_args.get("note", "")
                        handoff_task(task_id, role_id, to_agent, next_stage, note)
                        log_agent(role_id, f"Handed off Task #{task_id} to {to_agent.upper()} (Stage: {next_stage})", "green")
                        update_heartbeat(role_id, "idle", task_completed=True)
                        break

                    elif t_name == "finish_task":
                        summary = t_args.get("summary", "Task finished.")
                        update_task_status(task_id, "completed", summary)
                        log_agent(role_id, f"Completed Task #{task_id}: {summary}", "green")
                        log_event(role_id, "task_completed", f"Task #{task_id}: {summary}")
                        update_heartbeat(role_id, "idle", task_completed=True)
                        break

                    else:
                        tool_result = execute_tool(tool_call, repo_root)
                        log_agent(role_id, f"Tool Result: {json.dumps(tool_result)[:150]}...", "dim")
                        prompt = f"Tool output: {json.dumps(tool_result)}\n\nNext step or call finish_task/delegate_task."
                        step += 1
                else:
                    # If model didn't call a tool, conclude the task with the text output
                    log_agent(role_id, f"Model concluded with analysis.", color)
                    update_task_status(task_id, "completed", response[:1000])
                    update_heartbeat(role_id, "idle", task_completed=True)
                    break

            if single_task_mode:
                break

        except KeyboardInterrupt:
            print(f"\n{COLORS['yellow']}Shutting down {name}...{COLORS['reset']}")
            update_heartbeat(role_id, "offline")
            break
        except Exception as e:
            log_agent(role_id, f"Exception in agent loop: {e}", "red")
            time.sleep(5)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gradify AI Specialist Agent")
    parser.add_argument("--role", required=True, choices=list(ROLES_CONFIG.keys()), help="Agent role ID")
    parser.add_argument("--workspace", default=os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), help="Workspace repo root")
    parser.add_argument("--once", action="store_true", help="Process one task and exit")
    args = parser.parse_args()

    run_agent_loop(args.role, args.workspace, single_task_mode=args.once)
