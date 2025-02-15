"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { id } = await params; // ✅ Awaiting params
        const res = await fetch(`/api/task/${id}`);
        if (!res.ok) throw new Error("Failed to fetch task");

        const data = await res.json();
        setTaskTitle(data.title);
      } catch (err) {
        setError("Error loading task");
        console.error("Failed to fetch task:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [params]);

  const updateTask = async () => {
    if (!taskTitle.trim()) return;

    try {
      setLoading(true);
      const { id } = await params; 

      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      router.push("/");
    } catch (err) {
      setError("Error updating task");
      console.error("Task update error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading task...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={() => router.push("/tasks")}>Cancel</Button>
        <Button onClick={updateTask} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
}
