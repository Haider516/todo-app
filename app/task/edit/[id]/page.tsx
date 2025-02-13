"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditTaskPage({ params }: { params: { id: any } }) {
    console.log(params);
    
  const router = useRouter();
  const { id } = params; 
  const [taskTitle, setTaskTitle] = useState("");

  // Fetch task data when page loads
  useEffect(() => {
    fetch(`/api/task/${id}`)
      .then((res) => res.json())
      .then((data) => setTaskTitle(data.title))
      .catch((err) => console.error("Failed to fetch task:", err));
  }, [id]);

  // Handle updating the task
  const updateTask = async () => {
    if (!taskTitle.trim()) return;

    await fetch(`/api/task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle }),
    });

    router.push("/"); 
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={() => router.push("/tasks")}>
          Cancel
        </Button>
        <Button onClick={updateTask}>Update</Button>
      </div>
    </div>
  );
}
