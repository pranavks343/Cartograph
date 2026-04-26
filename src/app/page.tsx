"use client";

import { FaStackOverflow } from "react-icons/fa";
import {
  SiVercel, SiNetlify, SiLinear, SiDocker, SiGithub
} from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import {
  ArrowRight, BookOpen, CalendarCheck, Code2, FileText,
  Globe, Lock, MessageSquare, Search, Share2, Sparkles,
  Zap, GitBranch, Brain, Cpu
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" }
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[15px] tracking-tight text-slate-900 dark:text-white">RepoMind</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, id }) => (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium bg-transparent border-none cursor-pointer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              {label}
            </motion.button>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
            style={{ background: "linear-gradient(90deg,#6366f1,#7c3aed)" }}
          >
            Sign In <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 flex flex-col items-center text-center px-4">
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-8 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        AI Documentation for Codebases
      </div>

      <h1
        className="relative z-10 font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 px-4"
        style={{ fontSize: "clamp(34px, 8vw, 64px)", lineHeight: 1.1, maxWidth: "820px" }}
      >
        Understand any codebase.
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          10x faster.
        </span>
      </h1>

      <p className="relative z-10 text-[15px] sm:text-[17px] text-slate-500 dark:text-slate-400 max-w-[540px] leading-relaxed mb-10 px-4">
        RepoMind analyzes your GitHub repository and generates intelligent documentation,
        architecture insights, and answers — in seconds.
      </p>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full px-6">
        <Link
          href="/login"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "linear-gradient(90deg, #6366f1, #7c3aed)" }}
        >
          Get Started Free <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="#"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all hover:scale-[1.02]"
        >
          <CalendarCheck className="w-4 h-4" /> Book a Demo
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <DashboardPreview />
      </div>
    </section>
  );
}

function MobileDashboardPreview() {
  const stats = [
    { label: "Files", val: "12,842", icon: FileText, color: "text-indigo-500" },
    { label: "Functions", val: "8,591", icon: Zap, color: "text-amber-500" },
    { label: "Components", val: "1,243", icon: Cpu, color: "text-emerald-500" },
    { label: "Deps", val: "321", icon: GitBranch, color: "text-blue-500" },
  ];

  return (
    <div className="w-full max-w-[340px] mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl">
      <div className="bg-slate-50/80 dark:bg-slate-900/80 px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[13px] font-bold text-slate-800 dark:text-white">RepoMind</span>
        </div>

        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
          <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      <div className="p-5 text-left">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Project</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">vercel/next.js</p>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-100 dark:border-emerald-800">
            Live
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{label}</span>
              </div>
              <p className="text-base font-bold text-slate-900 dark:text-white">{val}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-900/50 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300">Codebase Health</p>
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">92%</span>
          </div>
          <div className="h-2 w-full bg-white/60 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: "92%" }} />
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white text-[13px] font-bold shadow-lg shadow-slate-200 dark:shadow-none active:scale-95 transition-transform">
          View Documentation
        </button>
      </div>
    </div>
  );
}

function DashboardPreview() {
  const sideItems = [
    { icon: Globe, label: "Overview", active: true },
    { icon: Code2, label: "Architecture" },
    { icon: BookOpen, label: "Modules" },
    { icon: Search, label: "Search" },
    { icon: MessageSquare, label: "Chat" },
    { icon: FileText, label: "Documentation" },
    { icon: Lock, label: "Files" },
  ];

  const stats = [
    { label: "Files Analyzed", val: "12,842", icon: FileText },
    { label: "Functions", val: "8,591", icon: Zap },
    { label: "Components", val: "1,243", icon: Cpu },
    { label: "Dependencies", val: "321", icon: GitBranch },
  ];

  const health = [
    { label: "Structure", val: 95 },
    { label: "Maintainability", val: 90 },
    { label: "Test Coverage", val: 88 },
    { label: "Documentation", val: 93 },
  ];

  const activity = [
    { text: "Repository synced", time: "1m ago", color: "bg-emerald-400" },
    { text: "Documentation generated", time: "5m ago", color: "bg-indigo-400" },
    { text: "Architecture updated", time: "10m ago", color: "bg-blue-400" },
    { text: "New dependencies found", time: "18m ago", color: "bg-amber-400" },
  ];

  return (
    <>
      <div className="md:hidden">
        <MobileDashboardPreview />
      </div>

      <div className="hidden md:block w-full overflow-x-auto pb-4 scrollbar-hide">
        <div className="min-w-[850px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-left shadow-sm">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-5 h-5 rounded-md bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Brain className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-white">RepoMind</span>
            </div>
            <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              <Search className="w-3 h-3" /> Search anything…
              <span className="ml-3 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">⌘K</span>
            </div>
          </div>

          <div className="flex" style={{ height: 440 }}>
            <aside className="w-48 border-r border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex flex-col py-3 px-2 gap-0.5 shrink-0">
              {sideItems.map(({ icon: Icon, label, active }) => (
                <button key={label} className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${active ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              ))}
              <div className="mt-auto px-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Repository</p>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-1 truncate">vercel/next.js</p>
                <button className="mt-2 w-full px-2 py-1.5 rounded-md bg-indigo-600 text-white text-[10px] font-semibold">Sync Now</button>
                <div className="flex gap-2 mt-3">
                  <SiGithub className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                  <BsTwitter className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                </div>
              </div>
            </aside>

            <main className="flex-1 p-4 overflow-hidden flex flex-col">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Overview</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {stats.map(({ label, val, icon: Icon }) => (
                  <div key={label} className="rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-3">
                    <div className="flex items-center gap-1 mb-1.5"><Icon className="w-3 h-3 text-indigo-400" /><span className="text-[9px] text-slate-400">{label}</span></div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{val}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Architecture Overview</p>
                    <span className="text-[10px] text-indigo-500 font-medium cursor-pointer">View full architecture →</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2 flex-wrap">
                    {["Web (Next.js)", "API (Node.js)", "Database (PostgreSQL)"].map((n, i) => (
                      <div key={n} className="flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{n}</span>
                        {i < 2 && <span className="text-slate-300 dark:text-slate-600 text-[9px]">→</span>}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {["Auth", "Billing", "Users", "Notifications"].map((n, i) => (
                      <div key={n} className="flex items-center gap-1">
                        <span className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/50 text-[9px] font-medium text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">{n}</span>
                        {i < 3 && <span className="text-slate-200 dark:text-slate-700 text-[8px]">+</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-2">Recent Activity</p>
                  <div className="space-y-2">
                    {activity.map(({ text, time, color }) => (
                      <div key={text} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${color}`} /><span className="text-[10px] text-slate-600 dark:text-slate-400">{text}</span></div>
                        <span className="text-[10px] text-slate-400">{time}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-indigo-500 font-medium mt-2 cursor-pointer">View all</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 flex-1">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Documentation Summary</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                  This is a Next.js application built with React, TypeScript and Tailwind CSS. It follows a modular structure with separated concerns for UI, API routes, utilities, and services.
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[9px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">{t}</span>
                  ))}
                </div>
              </div>
            </main>

            <aside className="w-52 border-l border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shrink-0 flex flex-col">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-3">Codebase Health</p>
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="9" className="text-indigo-50 dark:text-slate-900" />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="url(#grad2)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 40 * 0.92} ${2 * Math.PI * 40}`} />
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-base font-extrabold text-slate-800 dark:text-white">92%</p>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400">Healthy</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                {health.map(({ label, val }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{label}</span>
                      <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{val}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-indigo-100 dark:bg-slate-800">
                      <div className="h-full rounded-full" style={{ width: `${val}%`, background: "linear-gradient(90deg,#6366f1,#a855f7)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

const TRUST_LOGOS = [
  { icon: SiVercel, label: "Vercel" },
  { icon: SiGithub, label: "GitHub" },
  { icon: FaStackOverflow, label: "stackoverflow" },
  { icon: SiLinear, label: "Linear" },
  { icon: SiNetlify, label: "·netlify" },
  { icon: SiDocker, label: "docker" },
];

function TrustedBy() {
  return (
    <section className="py-12 border-y border-slate-100 dark:border-slate-900 bg-[#F8FAFC] dark:bg-slate-950">
      <p className="text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-slate-400 dark:text-slate-500 mb-8 px-4">
        Trusted by developers at
      </p>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:justify-between">
        {TRUST_LOGOS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-default select-none">
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Sparkles, title: "AI Generated Docs", desc: "Get architecture overviews, folder explanations, API docs and more — all generated by AI.", c: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  { icon: MessageSquare, title: "Chat with Your Code", desc: "Ask anything about your codebase and get accurate, context-aware answers instantly.", c: "bg-purple-50 text-purple-600 border-purple-100" },
  { icon: Code2, title: "Smart Code Parsing", desc: "We parse and understand your code structure, dependencies and relationships.", c: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  { icon: Search, title: "Semantic Search", desc: "Find any function, file, or logic instantly using natural language search.", c: "bg-purple-50 text-purple-600 border-purple-100" },
  { icon: Share2, title: "Export & Share", desc: "Export docs to MD, PDF or share with your team in one click.", c: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  { icon: Lock, title: "Private & Secure", desc: "Your code is encrypted, never shared and always under your control.", c: "bg-purple-50 text-purple-600 border-purple-100" },
];

function Features() {
  return (
    <section id="features" className="py-20 px-6 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-5">
          <span className="px-4 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 text-[10px] md:text-[11px] font-semibold uppercase tracking-wider shadow-sm">Features</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-center text-slate-900 dark:text-white tracking-tight mb-10 md:mb-12" style={{ lineHeight: 1.18 }}>
          Everything you need to<br />
          understand{" "}
          <span style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>any codebase</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-md hover:shadow-indigo-50 dark:hover:shadow-indigo-900/10 hover:-translate-y-0.5 transition-all cursor-default">
              <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", icon: SiGithub, title: "Connect Repository", desc: "Paste your GitHub repo URL and authorize RepoMind in seconds." },
  { n: "02", icon: Cpu, title: "We Analyze", desc: "Our engine parses every file, function, and dependency in your codebase." },
  { n: "03", icon: Brain, title: "AI Understands", desc: "RAG pipelines and LLMs build a deep semantic model of your code." },
  { n: "04", icon: FileText, title: "Get Documentation", desc: "Receive instant docs, architecture maps, and an AI chat interface." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 sm:px-8 bg-slate-50/60 dark:bg-slate-950/60">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-5">
          <span className="px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider">How It Works</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
          From repo link to deep understanding<br />
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">in 4 simple steps</span>
        </h2>
        
        <p className="text-center text-slate-400 md:text-slate-500 dark:text-slate-400 mb-12 md:mb-16 max-w-lg mx-auto text-xs sm:text-sm md:text-base px-4">No complex setup. No configuration. Just paste and go.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-indigo-200 via-purple-300 to-indigo-200 dark:from-indigo-900 dark:via-purple-800 dark:to-indigo-900" />
          {STEPS.map(({ n, icon: Icon, title, desc }) => (
            <div key={n} className="relative flex flex-col items-center text-center group">
              <div className="relative z-10 w-24 h-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md shadow-indigo-50 dark:shadow-none flex flex-col items-center justify-center mb-5 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 group-hover:shadow-indigo-100 transition-all">
                <Icon className="w-7 h-7 text-indigo-500 mb-1" />
                <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">{n}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[180px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="px-4 py-12 max-w-5xl mx-auto">
      <div
        className="relative overflow-hidden rounded-2xl px-6 sm:px-10 py-12 md:py-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
        style={{ background: "var(--cta-bg)" }}
      >
        <div className="shrink-0" style={{ width: 90, height: 90, position: "relative" }}>
          <div style={{
            position: "absolute", top: 18, left: 12, width: 66, height: 36,
            background: "linear-gradient(135deg,#a78bfa,#818cf8)",
            clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
          }} />
          <div style={{
            position: "absolute", top: 36, left: 12, width: 33, height: 38,
            background: "linear-gradient(180deg,#6366f1 0%,#4f46e5 100%)",
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            transform: "skewY(-15deg) translateY(2px)",
          }} />
          <div style={{
            position: "absolute", top: 36, left: 45, width: 33, height: 38,
            background: "linear-gradient(180deg,#7c3aed 0%,#6d28d9 100%)",
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            transform: "skewY(15deg) translateY(2px)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: 56, height: 10,
            background: "rgba(99,102,241,0.22)",
            borderRadius: "50%",
            filter: "blur(5px)",
          }} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-1.5">
            Ready to understand your codebase better?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Join thousands of developers who ship faster with RepoMind.</p>
        </div>
        <div className="shrink-0 flex flex-col items-center gap-1.5">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-all shadow-md hover:scale-[1.02] whitespace-nowrap"
            style={{ background: "linear-gradient(90deg,#6366f1,#7c3aed)" }}
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">No credit card required</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 pt-12 pb-8">
      <div className="max-w-4xl mx-auto px-8 flex justify-center">
        <p className="text-xs text-slate-400 dark:text-slate-500">Engraved with 💜 by Vivek</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#F8FAFC] dark:bg-slate-950"
    >
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <CTABanner />
      <Footer />
    </div>
  );
}