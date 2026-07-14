"use client";

import { useState } from "react";

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
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-8 flex gap-2">
        <input
          data-testid="task-input"
          className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-500"
          placeholder="New task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          data-testid="add-button"
          className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <div data-testid="task-list" className="flex flex-wrap gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            data-testid={`task-${task.id}`}
            className="group relative w-[calc(20%-0.8rem)] rounded-xl border border-zinc-200 bg-white p-3 transition-shadow hover:shadow-sm"
          >
            <span className="block pr-5 text-sm text-zinc-800">
              {task.text}
            </span>
            <button
              data-testid={`delete-${task.id}`}
              className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full text-xs text-zinc-400 opacity-0 transition-opacity hover:text-zinc-700 group-hover:opacity-100"
              onClick={() => handleDelete(task.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
