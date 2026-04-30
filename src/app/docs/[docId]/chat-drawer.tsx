"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ChatDrawer({ isOpen, onClose, docId }: { isOpen: boolean, onClose: () => void, docId: string }) {
  const [messages, setMessages] = useState<{ role: "user" | "bot", content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMessage, docId }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "bot", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-zinc-800"
          >
            <div className="p-4 border-b border-slate-100 dark:border-zinc-900 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ask RepoMind</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-500 font-medium">Online & Ready</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Start a Conversation</p>
                    <p className="text-xs text-slate-500">Ask about architecture, components, or how to implement a specific feature.</p>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                    msg.role === "bot" ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                  )}>
                    {msg.role === "bot" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === "bot" 
                      ? "bg-slate-50 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 rounded-tl-none border border-slate-100 dark:border-zinc-800" 
                      : "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-100 dark:shadow-none"
                  )}>
                    {msg.role === "bot" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-zinc-800">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
              <div className="relative">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="pr-12 h-12 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-indigo-600 focus:border-indigo-600"
                />
                <Button 
                  size="icon" 
                  disabled={!input.trim() || isLoading}
                  onClick={handleSend}
                  className="absolute right-1.5 top-1.5 h-9 w-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="mt-2 text-[10px] text-center text-slate-400">
                RepoMind can make mistakes. Consider checking important information.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}