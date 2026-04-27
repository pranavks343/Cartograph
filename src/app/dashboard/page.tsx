"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Brain, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthProxy } from "@/lib/proxy";

export default function DashboardPage() {
  const router = useRouter();
  const { session, isPending } = useAuthProxy();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        }
      }
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950">
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-slate-900 dark:text-white">RepoMind</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-sm border border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
            Hello {session.user.name} 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome to your RepoMind dashboard. Your email is {session.user.email}.
          </p>
          {session.user.image && (
            <div className="mt-6">
              <img src={session.user.image} alt={session.user.name} className="w-16 h-16 rounded-full border-2 border-indigo-600" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}