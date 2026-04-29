"use client";

import {
    Sparkles,
    ArrowRight,
    ChevronDown,
    Lock,
    Clock,
    Info,
    ShieldCheck as ShieldIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import axios from "axios";

interface Repo {
    id: number;
    name: string;
    full_name: string;
    url: string;
    owner: string;
    private: boolean;
}

export default function DashboardPage() {
    const { data: session } = authClient.useSession();
    const [repoUrl, setRepoUrl] = useState("");
    const [isLoadingRepos, setIsLoadingRepos] = useState(false);
    const [repos, setRepos] = useState<Repo[]>([]);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchRepos = async () => {
            setIsLoadingRepos(true);
            try {
                const response = await axios.get("/api/repos");
                setRepos(response.data);
            } catch (error) {
                console.error("Error fetching repos:", error);
            } finally {
                setIsLoadingRepos(false);
            }
        };

        if (session) {
            fetchRepos();
        }
    }, [session]);

    const emptyStateImage = theme === "dark" ? "/dark-empty-state.png" : "/light-empty-state.png";

    return (
        <main className="flex flex-col gap-6 p-4 md:p-8 pt-0 max-w-7xl mx-auto w-full">
            <div className="flex flex-col lg:items-start items-center gap-1 lg:-mt-2 mt-2">
                <h1 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Welcome back, {session?.user?.name || "Vivek"} 👋
                </h1>
                <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">
                    Let's turn your codebase into clarity.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-fr">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <Card className="rounded-[24px] border-slate-100 dark:border-zinc-800 bg-white dark:bg-[#0A0A0A] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden h-fit">
                        <CardContent className="p-6 md:p-8">
                            <div className="flex items-start gap-4 md:gap-6 mb-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="flex flex-col gap-0.5 md:gap-1">
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Analyze your repository</h3>
                                    <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                                        Get AI-powered insights, documentation, and architecture diagrams in seconds.
                                    </p>
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="flex flex-col md:flex-row gap-2 md:gap-3 p-1.5 rounded-[20px] border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm focus-within:border-indigo-300 dark:focus-within:border-indigo-700 focus-within:ring-4 focus-within:ring-indigo-50 dark:focus-within:ring-indigo-900/10 transition-all duration-300">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-10 md:h-11 px-3 md:px-4 gap-2 rounded-xl text-slate-600 dark:text-zinc-300 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 shrink-0 text-xs md:text-sm">
                                                Select <span className="hidden sm:inline">a recent URL</span> <ChevronDown className="w-4 h-4 text-slate-400" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-64 md:w-80 max-h-80 overflow-y-auto rounded-xl p-2 shadow-2xl border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                                            {isLoadingRepos ? (
                                                <div className="p-4 text-center text-sm text-slate-500">Loading your repos...</div>
                                            ) : repos.length > 0 ? (
                                                repos.map((repo) => (
                                                    <DropdownMenuItem
                                                        key={repo.id}
                                                        className="rounded-lg h-12 cursor-pointer flex flex-col items-start gap-0 px-4"
                                                        onClick={() => setRepoUrl(repo.url)}
                                                    >
                                                        <div className="flex items-center gap-2 w-full">
                                                            <span className="font-bold text-sm text-slate-800 dark:text-zinc-200 truncate">{repo.name}</span>
                                                            {repo.private && (
                                                                <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                                                            )}
                                                        </div>
                                                        <span className="text-[10px] text-slate-500 truncate w-full">{repo.full_name}</span>
                                                    </DropdownMenuItem>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center text-sm text-slate-500">No repositories found.</div>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <div className="h-7 w-px bg-slate-100 dark:bg-zinc-800 hidden md:block my-auto" />

                                    <div className="relative flex-1">
                                        <Input
                                            value={repoUrl}
                                            onChange={(e) => setRepoUrl(e.target.value)}
                                            placeholder="or type the GitHub repository URL"
                                            className="h-10 md:h-11 border-none shadow-none focus-visible:ring-0 px-3 md:px-4 text-xs md:text-sm font-medium placeholder:text-slate-400 bg-transparent dark:text-white"
                                        />
                                    </div>

                                    <Button className="h-10 md:h-11 px-6 md:px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 text-xs md:text-sm">
                                        Analyze <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider lg:justify-start justify-center">
                                <Lock className="w-3 h-3" />
                                Your data safe. Fathom codebases with ease
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 rounded-[24px] border-slate-100 dark:border-zinc-800 bg-white dark:bg-[#080b16] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.03)] dark:shadow-none flex flex-col items-center justify-center p-6 md:p-10 text-center min-h-[300px] md:min-h-[400px]">
                        <div className="relative w-48 h-48 md:w-72 md:h-72 mb-2">
                            <img
                                src={emptyStateImage}
                                alt="Empty state"
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col gap-1 -mt-24 items-center">
                            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">No repositories analyzed yet</h3>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 max-w-xs font-medium leading-relaxed">
                                Analyze a GitHub repository to unlock insights instantly.
                            </p>
                        </div>
                        <div className="mt-6 md:mt-8 flex items-center gap-2 text-[10px] md:text-[11px] text-slate-400 font-bold">
                            <ShieldIcon className="w-3.5 h-3.5 text-emerald-500" />
                            Your data is private and secure
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    <Card className="rounded-[24px] border-slate-100 dark:border-zinc-800 bg-white dark:bg-[#0A0A0A] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden">
                        <CardHeader className="p-6 pb-0 flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                Codebase Health <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-4">
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative w-32 h-32 md:w-36 md:h-36">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="44"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            className="text-slate-100 dark:text-zinc-900"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="44"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            strokeDasharray="276"
                                            strokeDashoffset="276"
                                            strokeLinecap="round"
                                            className="text-indigo-600 dark:text-indigo-500"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black text-slate-900 dark:text-white">--</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">No Data</span>
                                    </div>
                                </div>

                                <div className="w-full space-y-2.5">
                                    {[
                                        { label: "Maintainability", color: "bg-slate-200 dark:bg-zinc-800" },
                                        { label: "Documentation", color: "bg-slate-200 dark:bg-zinc-800" },
                                        { label: "Test Coverage", color: "bg-slate-200 dark:bg-zinc-800" },
                                        { label: "Security", color: "bg-slate-200 dark:bg-zinc-800" },
                                        { label: "Structure", color: "bg-slate-200 dark:bg-zinc-800" },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-2.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${item.color} group-hover:scale-125 transition-transform`} />
                                                <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                                    {item.label}
                                                </span>
                                            </div>
                                            <span className="text-xs font-black text-slate-300 dark:text-zinc-800">--</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[24px] border-slate-100 dark:border-zinc-800 bg-white dark:bg-[#0A0A0A] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.03)] dark:shadow-none overflow-hidden">
                        <CardHeader className="p-6 pb-0">
                            <CardTitle className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                Recent Activity
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6 pt-8 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-[16px] bg-slate-50 dark:bg-zinc-900 flex items-center justify-center mb-4">
                                <Clock className="w-5 h-5 md:w-6 md:h-6 text-slate-300 dark:text-zinc-700" />
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">No recent activity</h4>
                            <p className="text-[10px] md:text-[11px] text-slate-500 dark:text-zinc-500 font-medium leading-relaxed max-w-[150px]">
                                Your actions will appear here.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}