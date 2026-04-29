"use client";

import { useAuthProxy } from "@/lib/proxy";
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isPending } = useAuthProxy();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <SidebarProvider>
      <DashboardSidebar />
      
      <SidebarInset className="bg-[#FDFDFF] dark:bg-black">
        <header className="flex h-14 shrink-0 shadow-sm dark:shadow-white/5 items-center justify-between px-6">
          <div className="flex items-center gap-4">
             <SidebarTrigger className="text-slate-500 dark:text-zinc-400" />
          </div>
          <div className="flex items-center gap-4">
             <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}