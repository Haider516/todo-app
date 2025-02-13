"use client"
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Checkbox } from "@radix-ui/react-checkbox";

interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskItem({ id, title, completed, onEdit, onDelete, onToggle }: TaskProps) {
  return (
    <Card className="flex justify-between items-center p-4">
      <CardContent className="flex items-center gap-2">
        <Checkbox checked={completed} onCheckedChange={() => onToggle(id)} />
        <span className={`${completed ? "line-through text-gray-500" : "text-black"}`}>{title}</span>
      </CardContent>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(id, title)}>
          <Pencil size={18} />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => onDelete(id)}>
          <Trash2 size={18} />
        </Button>
      </div>
    </Card>
  );
}
