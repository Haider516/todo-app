import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from 'shadcn/ui';
import { prisma } from '@/lib/prisma';

const NewTaskPage = () => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title) {
            setError('Title is required');
            return;
        }

        try {
            await prisma.task.create({
                data: {
                    title,
                },
            });
            router.push('/');
        } catch (err) {
            setError('Failed to create task');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter task title"
                            />
                        </FormControl>
                        {error && <FormMessage>{error}</FormMessage>}
                    </FormItem>
                </FormField>
                <Button type="submit" className="mt-4">Create Task</Button>
            </Form>
        </div>
    );
};

export default NewTaskPage;</div>