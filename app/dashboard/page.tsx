import { DataTable } from "@/components/ui/taskTableList";
import NewTask from "@/components/ui/NewTask";
import { SignOutButton } from "@/components/ui/logout";

export default function Page() {
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
