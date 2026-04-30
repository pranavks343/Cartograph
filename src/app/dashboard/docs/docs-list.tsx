"use client";

import { 
  Search, 
  Filter, 
  ArrowRight, 
  LayoutGrid, 
  List, 
  Plus,
  FileCode,
  Globe,
  Zap,
  Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function DocsList({ docs }: { docs: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDocs = docs.filter(doc => 
    doc.repoName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex-1 p-8 space-y-8 bg-[#FDFDFF] dark:bg-black overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Generated Docs</h1>
          <p className="text-sm text-slate-500 font-medium">View and explore AI-generated documentation for your analyzed repositories.</p>
        </div>
        <Link href="/dashboard">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl gap-2 h-11 px-6 shadow-lg shadow-indigo-100 dark:shadow-none">
            <Plus className="w-4 h-4" /> Analyze New Repository
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search docs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="h-11 rounded-xl border-slate-200 dark:border-zinc-800 gap-2 font-bold text-slate-600 dark:text-zinc-400 bg-white dark:bg-zinc-950">
            All Repositories <Filter className="w-4 h-4" />
          </Button>
          <div className="flex bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-1 shadow-sm">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewMode("grid")}
              className={cn("h-9 w-9 rounded-lg", viewMode === "grid" ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600" : "text-slate-400")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewMode("list")}
              className={cn("h-9 w-9 rounded-lg", viewMode === "list" ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600" : "text-slate-400")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className={cn(
        "grid gap-6",
        viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {filteredDocs.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group relative border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 rounded-[24px] overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl">
                      {doc.repoName[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{doc.repoName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(doc.createdAt))}</span>
                        <Badge variant="success" className="h-4 px-1.5 text-[8px] font-black uppercase">Analyzed</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2">
                  {doc.overview || "AI-generated overview of the repository structure, tech stack, and key architectural patterns."}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {JSON.parse(doc.techStack || '[]').slice(0, 4).map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="bg-indigo-50/50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 border-none rounded-lg text-[9px] font-bold">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50 dark:border-zinc-900">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <FileCode className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">Files</span>
                    </div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">124</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Zap className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">APIs</span>
                    </div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">18</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Globe className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">Pages</span>
                    </div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">12</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                    <Clock className="w-3 h-3" />
                    Last analyzed: {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(doc.updatedAt))}
                  </div>
                  <Link href={`/docs/${doc.id}`}>
                    <Button size="icon" className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-zinc-900 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {docs.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-zinc-900 flex items-center justify-center mx-auto">
              <FileCode className="w-8 h-8 text-slate-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No analyzed repositories</h3>
              <p className="text-sm text-slate-500">Start by analyzing your first repository from the dashboard.</p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-xl border-slate-200 dark:border-zinc-800">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>

      {docs.length > 0 && (
        <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-zinc-900">
          <p className="text-xs text-slate-400 font-medium">Showing {docs.length} of {docs.length} repositories</p>
          <div className="flex items-center gap-1">
             <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0 rounded-lg">1</Button>
          </div>
        </div>
      )}
    </div>
  );
}