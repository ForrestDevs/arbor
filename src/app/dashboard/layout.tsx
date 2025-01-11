import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardBreadcrumbs } from "@/components/layout/dashboard-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <DashboardBreadcrumbs />
              </div>
              <ThemeToggle />
            </div>
          </header>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
