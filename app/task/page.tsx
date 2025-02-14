"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';



interface TaskProps {
    id: number;
    title: string;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}


const Task: React.FC<TaskProps> = ({ id, title, onDelete, onEdit }) => {
    const [taskTitle, setTaskTitle] = useState(title);

    const handleEdit = () => {
        const newTitle = prompt('Edit task title:', taskTitle);
        if (newTitle) {
            setTaskTitle(newTitle);
            onEdit(id);
        }
    };

  return (
        <div className="task">
            <h3>{taskTitle}</h3>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={() => onDelete(id)}>Delete</Button>
      </div>
    );
};

export default Task;