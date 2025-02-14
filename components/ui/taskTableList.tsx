"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // ✅ Import Button
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function DataTable() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/task")
      .then((res) => res.json())
      .then(setTasks)
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

 
  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updated = { ...task, completed: !task.completed };
    await fetch(`/api/task/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };


  const deleteTask = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      await fetch(`/api/task/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };


  const editTask = (id: string) => {
    router.push(`/task/edit/${id}`);
  };

  return (
    <Table className="w-full border shadow-md rounded-lg">
      <TableCaption>A list of your tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Task ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead> 
          <TableHead className="text-center w-[300px] ">Actions</TableHead> 
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <Button
                variant={item.completed ? "success" : "outline"}
                onClick={() => toggleTask(item.id)}
              >
                {item.completed ? "Completed" : "Pending"}
              </Button>
            </TableCell>
            <TableCell className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => editTask(item.id)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteTask(item.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
