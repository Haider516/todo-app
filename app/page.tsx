
import NewTask from "@/components/ui/NewTask";
import TaskList from "@/components/ui/TaskList";

export default function Home() {
  return (
    <main className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
      <NewTask />
      <TaskList />
    </main>
  );
}
