import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/taskTableList";
import NewTask from "@/components/ui/NewTask";

export default function Page() {
    return (
        <div className="space-y-6"> 
            <NewTask />
            <DataTable />
        </div>



    );
}
