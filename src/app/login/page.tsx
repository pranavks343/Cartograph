"use client";

import Image from "next/image";
import { SiGithub } from "react-icons/si";
import {
  Lock,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Brain
} from "lucide-react";
import { useAuthProxy } from "@/lib/proxy";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const { isPending } = useAuthProxy();

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-slate-950">
      <div className="hidden md:flex md:w-[50%] lg:w-[55%] relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
        <Image
          src="/auth.png"
          alt="RepoMind Hero"
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover opacity-90 dark:opacity-40"
          priority
        />
        <div className="absolute top-10 left-10 flex items-center gap-2.5 z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">RepoMind</span>
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-white/10 dark:via-slate-950/20 dark:to-slate-950/40 pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-20 px-6 sm:px-12 bg-[#FAFBFE] dark:bg-slate-950">
        <div className="w-full max-w-[480px]">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100/80 dark:border-slate-800 p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] md:text-[11px] font-semibold uppercase tracking-wider mb-4 md:mb-5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Secure & developer-friendly
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                Welcome back 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
                Sign in to RepoMind to continue
              </p>
            </div>

            <button 
              onClick={handleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-[#0F172A] dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 text-white font-semibold py-3.5 md:py-4 px-6 rounded-2xl transition-all shadow-xl shadow-slate-200/50 dark:shadow-none mb-6 md:mb-8 active:scale-[0.98] text-sm md:text-base cursor-pointer border-none"
            >
              <SiGithub className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>

            <div className="relative mb-6 md:mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] md:text-xs">
                <span className="px-4 bg-white dark:bg-slate-900 text-slate-400 font-medium">Why GitHub?</span>
              </div>
            </div>

            <div className="space-y-5 md:space-y-6 mb-8 md:mb-2 text-left">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-0.5">Secure OAuth Authentication</h3>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">We never store your GitHub password.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-0.5">Access Private Repositories</h3>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Analyze private repos with your permission.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-0.5">One-Click, Seamless Access</h3>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Connect and get insights in seconds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}