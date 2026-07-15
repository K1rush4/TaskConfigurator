import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Home from "../page";

describe("TaskPlanner", () => {
  it("adds a task on button click", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByTestId("task-input"), "Buy milk");
    await user.click(screen.getByTestId("add-button"));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("adds a task on Enter key", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByTestId("task-input"), "Write tests{Enter}");

    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  it("does not add empty or whitespace-only tasks", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const input = screen.getByTestId("task-input");
    await user.type(input, "   ");
    await user.click(screen.getByTestId("add-button"));
    expect(screen.queryByText("   ")).not.toBeInTheDocument();
    expect(screen.getByText("No tasks yet")).toBeInTheDocument();

    await user.clear(input);
    await user.click(screen.getByTestId("add-button"));

    expect(screen.getByText("No tasks yet")).toBeInTheDocument();
  });

  it("deletes a task on X click", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByTestId("task-input"), "Task to delete{Enter}");

    const taskCard = screen.getByText("Task to delete").closest("[data-testid^='task-']")!;
    const taskId = taskCard.getAttribute("data-testid")!.replace("task-", "");
    await user.click(screen.getByTestId(`delete-${taskId}`));

    expect(screen.queryByText("Task to delete")).not.toBeInTheDocument();
  });

  it("hides X button by default", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.type(screen.getByTestId("task-input"), "Hover test{Enter}");

    const taskCard = screen.getByText("Hover test").closest("[data-testid^='task-']")!;
    const taskId = taskCard.getAttribute("data-testid")!.replace("task-", "");
    const deleteButton = screen.getByTestId(`delete-${taskId}`);

    expect(deleteButton.className).toContain("opacity-0");
    expect(deleteButton.className).toContain("group-hover:opacity-100");
  });
});
