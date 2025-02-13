import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 });
  }
}

// POST - Create a new task
export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const newTask = await prisma.task.create({ data: { title } });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}
