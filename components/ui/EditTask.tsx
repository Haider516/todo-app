
"use client"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = params.id;
  const [taskTitle, setTaskTitle] = useState(searchParams.get("title") || "");

  const updateTask = async () => {
    if (!taskTitle.trim()) return;

    await fetch(`/api/task/${taskId}`, {
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
        <Button variant="outline" onClick={() => router.push("/")}>
          Cancel
        </Button>
        <Button onClick={updateTask}>Update</Button>
      </div>
    </div>
  );
}
