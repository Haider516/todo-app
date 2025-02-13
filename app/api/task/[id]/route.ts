import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch a single task by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const task = await prisma.task.findUnique({ where: { id: params.id } });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching task" }, { status: 500 });
  }
}

// PUT - Update a task
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, completed } = await req.json();
    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: { title, completed },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}

// DELETE - Remove a task
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.task.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}
