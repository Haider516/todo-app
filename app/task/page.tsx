"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  title: string;
}

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/task");
        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError("Error loading tasks");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`/api/task/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const editTask = (id: number) => {
    console.log("Redirect to edit task page");
    // Implement navigation logic here
  };

  if (loading) return <div className="text-center mt-4">Loading tasks...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-center">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <Task key={task.id} id={task.id} title={task.title} onDelete={deleteTask} onEdit={editTask} />
        ))
      )}
    </div>
  );
}

interface TaskProps {
  id: number;
  title: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, onDelete, onEdit }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="text-lg">{title}</h3>
      <div className="flex gap-2">
        <Button onClick={() => onEdit(id)}>Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(id)}>Delete</Button>
      </div>
    </div>
  );
};
