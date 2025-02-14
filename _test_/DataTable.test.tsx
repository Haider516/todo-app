import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/taskTableList";

// Mock `useRouter`
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve([]) })
) as jest.Mock;

describe("DataTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deletes a task when the delete button is clicked", async () => {
    const mockTasks = [
      { id: "1", title: "Test Task 1", completed: false },
      { id: "2", title: "Test Task 2", completed: false },
    ];

    // Mock API calls
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockTasks) }) // Initial fetch
      .mockResolvedValueOnce({ json: () => Promise.resolve([]) }); // After delete

    // Mock `useRouter`
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    // Mock `window.confirm`
    jest.spyOn(window, "confirm").mockImplementation(() => true);

    render(<DataTable />);

    // Wait for tasks to load
    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    });

    // Find delete button & click it
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]); // Click delete on first task

    // ✅ Ensure DELETE API call was made
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/task/1", { method: "DELETE" });
    });

    // ✅ Ensure task is removed from UI
    await waitFor(() => {
      expect(screen.queryByText("Test Task 1")).not.toBeInTheDocument();
    });
  });
});
