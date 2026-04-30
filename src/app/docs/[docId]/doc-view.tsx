"use client";

import { useState } from "react";
import {
  MessageSquare,
  FileText,
  ChevronRight,
  Folder,
  File,
  Activity,
  CheckCircle2,
  AlertCircle,
  Zap,
  Shield,
  BookOpen,
  Code2,
  Globe,
  Cpu,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatDrawer } from "./chat-drawer";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiPrisma, SiReact, SiGithub, SiVercel } from "react-icons/si";
import { cn } from "@/lib/utils";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(date);
};

const formatFullDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

const iconMap: any = {
  "Next.js": { icon: SiNextdotjs, color: "text-slate-900 dark:text-white" },
  "TypeScript": { icon: SiTypescript, color: "text-blue-500" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "text-indigo-400" },
  "PostgreSQL": { icon: SiPostgresql, color: "text-indigo-500" },
  "Prisma": { icon: SiPrisma, color: "text-emerald-500" },
  "React": { icon: SiReact, color: "text-blue-400" },
  "Vercel": { icon: SiVercel, color: "text-slate-900 dark:text-white" },
  "GitHub": { icon: SiGithub, color: "text-slate-900 dark:text-white" },
};

export function DocView({ doc }: { doc: any }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const techStack = JSON.parse(doc.techStack || "[]");
  const codebaseHealth = JSON.parse(doc.codebaseHealth || "{}");
  const importantFiles = JSON.parse(doc.importantFiles || "[]");
  const apiRoutes = JSON.parse(doc.apiRoutes || "[]");
  const components = JSON.parse(doc.components || "[]");
  const dependencies = JSON.parse(doc.dependencies || "[]");
  const recentActivity = JSON.parse(doc.recentActivity || "[]");
  const folderStructure = JSON.parse(doc.folderStructure && doc.folderStructure.startsWith('[') ? doc.folderStructure : "[]");
  const keyFeatures = JSON.parse(doc.keyFeatures || "[]");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-black">
      <header className="px-8 py-6 border-b border-slate-200 dark:border-zinc-900 bg-white dark:bg-black flex items-center justify-between sticky top-0 z-20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Generated Docs</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 dark:text-white">{doc.repoName}</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{doc.repoName}</h1>
            <a href={doc.repoUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <SiGithub className="w-5 h-5" />
            </a>
            <Badge variant="success" className="h-5 px-2 text-[10px]">Analyzed</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Documentation generated on {formatDate(new Date(doc.updatedAt))} • 124 files analyzed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsChatOpen(true)}
            className="h-9 px-4 gap-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Ask RepoMind
          </Button>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto w-full flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-transparent h-auto p-0 border-b border-slate-200 dark:border-zinc-900 w-full justify-start rounded-none gap-8">
            {["Overview", "Architecture", "Files", "APIs", "Components", "Dependencies", "Codebase Health", "Activity"].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(" ", "-")}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-xs font-semibold text-slate-500 data-[state=active]:text-indigo-600"
              >
                {tab === "Overview" && <Globe className="w-3.5 h-3.5 mr-2" />}
                {tab === "Architecture" && <Code2 className="w-3.5 h-3.5 mr-2" />}
                {tab === "Files" && <FileText className="w-3.5 h-3.5 mr-2" />}
                {tab === "APIs" && <Zap className="w-3.5 h-3.5 mr-2" />}
                {tab === "Components" && <Cpu className="w-3.5 h-3.5 mr-2" />}
                {tab === "Dependencies" && <BookOpen className="w-3.5 h-3.5 mr-2" />}
                {tab === "Codebase Health" && <Shield className="w-3.5 h-3.5 mr-2" />}
                {tab === "Activity" && <Activity className="w-3.5 h-3.5 mr-2" />}
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold">Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {doc.overview || "A modern SaaS starter built with Next.js 14, TypeScript, Tailwind CSS, and Prisma. It includes authentication, subscriptions, billing, and a beautiful dashboard UI."}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {techStack.slice(0, 4).map((tech: string) => {
                      const techData = iconMap[tech] || { icon: Globe, color: "text-slate-400" };
                      const Icon = techData.icon;
                      return (
                        <div key={tech} className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 flex flex-col items-start gap-2">
                          <Icon className={`w-5 h-5 ${techData.color}`} />
                          <div>
                            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Technology</p>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">{tech}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-bold">Codebase Health</CardTitle>
                  <AlertCircle className="w-4 h-4 text-slate-400" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center py-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-zinc-900" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#healthGrad)" strokeWidth="8" strokeDasharray={`${2 * Math.PI * 45 * 0.82} ${2 * Math.PI * 45}`} strokeLinecap="round" />
                        <defs>
                          <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">
                          {codebaseHealth.overall || codebaseHealth.score || 0}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">/100</span>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className={cn(
                        "text-sm font-bold",
                        (codebaseHealth.overall || 0) >= 80 ? "text-emerald-600 dark:text-emerald-400" :
                        (codebaseHealth.overall || 0) >= 60 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"
                      )}>
                        {codebaseHealth.status || "Analyzing..."}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">Overall Code Health</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Maintainability", value: codebaseHealth.maintainability || 0 },
                      { label: "Documentation", value: codebaseHealth.documentation || 0 },
                      { label: "Test Coverage", value: codebaseHealth.testCoverage || 0 },
                      { label: "Security", value: codebaseHealth.security || 0 },
                      { label: "Structure", value: codebaseHealth.structure || 0 },
                    ].map((m) => (
                      <div key={m.label} className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-slate-500">{m.label}</span>
                          <span className="text-slate-900 dark:text-white font-bold">{m.value}/100</span>
                        </div>
                        <Progress value={m.value} className="h-1 bg-slate-100 dark:bg-zinc-900" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold">Repository Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar">
                  <div className="flex items-center gap-2 p-1 text-sm font-bold text-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg">
                    <Folder className="w-4 h-4 text-indigo-500" /> {doc.repoName}/
                  </div>
                  {folderStructure.length > 0 ? folderStructure.map((folder: any) => (
                    <div key={folder.path} className="flex items-center gap-2 pl-4 p-1 text-sm text-slate-500 group hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-lg transition-colors">
                      <Folder className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" /> 
                      <span className="font-medium text-slate-700 dark:text-zinc-300">{folder.path}</span>
                      <span className="ml-auto text-[10px] text-slate-400 font-normal opacity-0 group-hover:opacity-100 transition-opacity">{folder.description}</span>
                    </div>
                  )) : (
                    <div className="py-8 text-center">
                      <Folder className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                      <p className="text-[11px] text-slate-400">Structure metadata pending...</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold">Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {keyFeatures.length > 0 ? keyFeatures.map((f: string) => (
                    <div key={f} className="flex items-center gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <span className="text-sm text-slate-600 dark:text-zinc-400 font-medium">{f}</span>
                    </div>
                  )) : (
                    <div className="py-8 text-center">
                      <Zap className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                      <p className="text-[11px] text-slate-400">Feature extraction pending...</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold">Important Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {importantFiles.length > 0 ? importantFiles.map((f: any) => (
                    <div key={f.path} className="flex items-start gap-3 group">
                      <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
                        <File className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{f.path}</p>
                        <p className="text-[10px] text-slate-500 truncate">{f.reason}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-xs text-slate-400 italic">No important files highlighted.</p>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("files")}
                    className="w-full text-indigo-600 hover:text-indigo-700 font-bold text-xs"
                  >
                    View all files →
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-zinc-900">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                <Clock className="w-3 h-3" />
                Last analyzed: {formatFullDate(new Date(doc.updatedAt))}
              </div>
              <p className="text-[10px] text-slate-400 font-medium">RepoMind v1.0 • AI-Generated Content</p>
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-indigo-500" /> System Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
                  {doc.architectureSummary || "The application follows a modern architecture leveraging Server Components and Client Components appropriately."}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Core Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {components.length > 0 ? components.map((comp: any) => (
                    <div key={comp.name} className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{comp.name}</p>
                        <p className="text-xs text-slate-500">{comp.description}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-xs text-slate-400 italic">No major components identified.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Dependencies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dependencies.length > 0 ? dependencies.slice(0, 6).map((dep: any) => (
                    <div key={dep.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
                      <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">{dep.name}</span>
                      <Badge variant="secondary" className="text-[9px] font-black">{dep.version}</Badge>
                    </div>
                  )) : (
                    <p className="text-xs text-slate-400 italic">No dependencies metadata available.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="apis" className="space-y-6">
            <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" /> API Endpoints & Routes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiRoutes.length > 0 ? apiRoutes.map((route: any) => (
                  <div key={route.path} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50 group hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors">
                    <div className="flex items-center gap-3">
                      <Badge className={cn(
                        "text-[10px] font-black uppercase w-16 justify-center",
                        route.method === "GET" ? "bg-emerald-500 hover:bg-emerald-600" :
                          route.method === "POST" ? "bg-indigo-500 hover:bg-indigo-600" :
                            route.method === "PUT" ? "bg-amber-500 hover:bg-amber-600" : "bg-rose-500 hover:bg-rose-600"
                      )}>
                        {route.method}
                      </Badge>
                      <span className="text-sm font-mono font-bold text-slate-700 dark:text-zinc-300">{route.path}</span>
                    </div>
                    <span className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{route.description}</span>
                  </div>
                )) : (
                  <div className="py-12 text-center space-y-2">
                    <Zap className="w-8 h-8 text-slate-200 mx-auto" />
                    <p className="text-sm text-slate-400 font-medium">No API routes detected in this repository.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm h-fit">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Directory Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="flex items-center gap-2 p-2 text-sm font-bold text-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-lg mb-2">
                    <Folder className="w-4 h-4" /> {doc.repoName}
                  </div>
                  {folderStructure.map((folder: any) => (
                    <div key={folder.path} className="flex items-center gap-2 p-2 pl-6 text-sm text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer group">
                      <Folder className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                      <span className="font-medium">{folder.path}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-500" /> Critical Source Files
                  </CardTitle>
                  <Badge variant="secondary" className="text-[10px]">{importantFiles.length} Files Tagged</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {importantFiles.length > 0 ? importantFiles.map((file: any) => (
                      <div key={file.path} className="flex flex-col p-4 rounded-2xl border border-slate-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 shadow-sm group-hover:scale-110 transition-transform">
                            <File className="w-4 h-4 text-indigo-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{file.path}</p>
                            <p className="text-[11px] text-slate-500 font-medium">Source File</p>
                          </div>
                          <Badge className="bg-indigo-500 hover:bg-indigo-600 text-[10px] font-black uppercase">Critical</Badge>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed pl-12">
                          {file.reason}
                        </p>
                      </div>
                    )) : (
                      <div className="py-20 text-center space-y-4">
                        <FileText className="w-12 h-12 text-slate-200 mx-auto" />
                        <p className="text-sm text-slate-400 font-medium">No files have been tagged as important yet.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {components.length > 0 ? components.map((comp: any) => (
                <Card key={comp.name} className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group">
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-sm font-bold">{comp.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      {comp.description}
                    </p>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
                  <Cpu className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                  <p className="text-sm text-slate-400 font-medium">No specialized components identified yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dependencies" className="space-y-6">
            <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" /> Project Dependencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dependencies.length > 0 ? dependencies.map((dep: any) => (
                    <div key={dep.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{dep.name}</span>
                        <span className="text-[10px] text-slate-400">{dep.type || "Dependency"}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-black">{dep.version || "latest"}</Badge>
                    </div>
                  )) : (
                    <p className="col-span-full text-xs text-slate-400 italic text-center py-8">No dependency information available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codebase-health" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-500" /> Detailed Health Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    {Object.entries(codebaseHealth).filter(([k]) => k !== 'score' && k !== 'overall' && k !== 'status').map(([key, value]: [string, any]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{key}</h4>
                          <span className="text-sm font-black text-slate-900 dark:text-white">{value}/100</span>
                        </div>
                        <Progress value={value} className="h-2 bg-slate-100 dark:bg-zinc-900" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">Security & Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Security Passed</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-300">No major security vulnerabilities detected in the analyzed files.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Optimization Needed</span>
                    </div>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300">Bundle size could be optimized by reducing external UI library overhead.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-500" /> Recent Activity & Commits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-100 dark:before:via-zinc-800 before:to-transparent">
                  {recentActivity.length > 0 ? recentActivity.map((act: any, i: number) => (
                    <div key={i} className="relative flex items-center gap-6 group">
                      <div className="absolute left-0 w-10 h-10 rounded-full bg-white dark:bg-zinc-950 border-2 border-indigo-500 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="ml-12 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{act.text}</h4>
                          <span className="text-[10px] text-slate-400 font-medium uppercase">{act.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">Activity detected in {doc.repoName} main branch.</p>
                      </div>
                    </div>
                  )) : (
                    <div className="py-20 text-center space-y-4">
                      <Activity className="w-12 h-12 text-slate-200 mx-auto" />
                      <p className="text-sm text-slate-400 font-medium">No recent activity metadata found.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)} docId={doc.id}
      />
    </div>
  );
}