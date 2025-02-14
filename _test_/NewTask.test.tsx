import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewTask from "@/components/ui/NewTask";

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({}) })
) as jest.Mock;

describe("NewTask Component", () => {
  test("updates input when user types", () => {
    render(<NewTask />);
    const input = screen.getByPlaceholderText("Enter a task...");

    fireEvent.change(input, { target: { value: "New Task" } });
    expect(input).toHaveValue("New Task");
  });

  test("calls API when 'Add Task' button is clicked", async () => {
    render(<NewTask />);
    const input = screen.getByPlaceholderText("Enter a task...");
    const button = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.click(button);

    expect(global.fetch).toHaveBeenCalledWith("/api/task", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Test Task" }),
    }));
  });
});
