"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; 
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewTaskPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  // ✅ Initialize react-hook-form
  const form = useForm({
    defaultValues: { title: "" },
  });

  const handleSubmit = async (data: { title: string }) => {
    setError("");

    if (!data.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.title }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      router.push("/"); 
    } catch (err) {
      setError("Failed to create task");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      
    
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter task title" />
                </FormControl>
                <FormMessage>{error}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4">Create Task</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewTaskPage;
