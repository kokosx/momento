import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "../../../components/ui/breadcrumb";
import { AppSidebar } from "@/components/AppSidebar";
import { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
      <SidebarInset>
        <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
