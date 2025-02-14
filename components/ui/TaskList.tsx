
"use client"

import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { signOut } from "next-auth/react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function TaskList() {
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
    await fetch(`/api/task/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id: string) => {
    router.push(`/task/edit/${id}`); 
};


  return (
    
    <div className="space-y-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task.id} {...task} onEdit={editTask} onDelete={deleteTask} onToggle={toggleTask} />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks found. Add a new task!</p>
      )}
    </div>


    
      
    
  );
}
