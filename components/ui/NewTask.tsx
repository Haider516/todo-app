
"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewTask() {
  const [taskTitle, setTaskTitle] = useState("");

  const addTask = async () => {
    if (!taskTitle.trim()) return;

    await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle }),
    });

    setTaskTitle("");
    window.location.reload();
  };

  return (
    <div className="flex gap-2 my-4">
      <Input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter a task..."
      />
      <Button onClick={addTask}>Add Task</Button>
    </div>
  );
}
