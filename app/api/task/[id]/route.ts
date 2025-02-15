import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("Fetching task with ID:", id);

    if (!id) {
      return NextResponse.json({ error: "Task ID is missing" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ error: "Error fetching task" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("Deleting task with ID:", id);

    if (!id) {
      return NextResponse.json({ error: "Task ID is missing" }, { status: 400 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    console.log("Updating task with ID:", id);

    if (!id) {
      return NextResponse.json({ error: "Task ID is missing" }, { status: 400 });
    }

    const { title, completed } = await req.json();

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, completed },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}
