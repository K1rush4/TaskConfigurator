"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  text: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  function handleAdd() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed }]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleAdd();
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="planner-bg flex min-h-screen flex-1 items-start justify-center">
      <div className="container mx-auto max-w-[1200px] px-4 py-12 lg:py-16">
        <div className="mb-12">
          <h1 className="font-display text-5xl font-bold tracking-tight lg:text-6xl">
            Task Planner
          </h1>
          <p className="mt-2 text-muted-foreground">
            A planning desk for your daily tasks
          </p>
        </div>

        <div className="glass-panel mb-10 rounded-2xl p-5">
          <div className="flex gap-3">
            <input
              data-testid="task-input"
              className="flex-1 rounded-xl border border-border bg-background/30 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-ring focus:ring-[3px] focus:ring-ring/30"
              placeholder="Add a new task…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              data-testid="add-button"
              className="command-strip flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-95"
              onClick={handleAdd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add
            </button>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-4 text-muted-foreground/40"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M12 11h4" />
              <path d="M12 16h4" />
              <path d="M8 11h.01" />
              <path d="M8 16h.01" />
            </svg>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-muted-foreground">
              No tasks yet
            </h2>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground/60">
              Add your first task above and it will appear here.
            </p>
          </div>
        ) : (
          <div data-testid="task-list" className="flex flex-wrap gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                data-testid={`task-${task.id}`}
                className="paper-card group relative w-[calc(20%-0.8rem)] rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
              <span className="font-display block pr-6 text-base font-semibold tracking-tight text-foreground break-all">
                {task.text}
              </span>
                <button
                  data-testid={`delete-${task.id}`}
                  className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full text-muted-foreground/40 opacity-0 transition-all hover:bg-destructive/15 hover:text-destructive group-hover:opacity-100"
                  onClick={() => handleDelete(task.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
