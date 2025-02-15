import { DataTable } from "@/components/ui/taskTableList";
import NewTask from "@/components/ui/NewTask";
import { SignOutButton } from "@/components/ui/logout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function  Page() {

    const session = await getServerSession();
    
      if (!session) {
        redirect("/auth/login"); 
      }

    return (
        <div className="space-y-6"> 
         <SignOutButton/>
         <br />
         <br />
            <NewTask />
            <DataTable />
        </div>



    );
}
