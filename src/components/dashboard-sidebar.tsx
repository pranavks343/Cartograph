"use client";

import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  ChevronUp,
  Brain,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Generated Docs",
    url: "/dashboard/docs",
    icon: FileText,
  },
  {
    title: "My Profile",
    url: "/dashboard/profile",
    icon: User,
  },
];

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    data: session 
  } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <Sidebar className="border-r border-slate-200 dark:border-zinc-900 dark:bg-[#050505]">
      <SidebarHeader className="px-6 py-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-linear-to-br from-indigo-500 to-purple-600">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-data-[collapsible=icon]:hidden">RepoMind</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "h-12 px-4 rounded-xl transition-all duration-200 border border-transparent",
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                          : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600 dark:text-indigo-400" : "")} />
                        <span className={cn("group-data-[collapsible=icon]:hidden", isActive ? "text-indigo-600 dark:text-indigo-400" : "")}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-16 px-3 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all">
                  <div className="flex items-center gap-3 w-full">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-10 h-10 rounded-full border border-slate-200 dark:border-zinc-700"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:border-zinc-800 flex items-center justify-center font-bold text-slate-500">
                        {session?.user?.name?.[0]}
                      </div>
                    )}
                    <div className="flex flex-col items-start overflow-hidden group-data-[collapsible=icon]:hidden">
                      <span className="font-bold text-sm text-slate-900 dark:text-white truncate w-full">
                        {session?.user?.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-zinc-500 truncate w-full">
                        {session?.user?.email}
                      </span>
                    </div>
                    <ChevronUp className="ml-auto w-4 h-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-(--radix-popper-anchor-width) mb-2 rounded-xl p-2 shadow-xl border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="rounded-lg h-10 gap-3 text-red-600 dark:text-red-400 focus:text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}