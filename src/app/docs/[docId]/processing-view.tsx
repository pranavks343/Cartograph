"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function ProcessingView({ docId }: { docId: string }) {
  const router = useRouter();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/docs/${docId}/status`);
        const data = await res.json();

        if (data.status === "COMPLETED" || data.status === "SUCCESS" || data.status === "ANALYZED") {
          router.refresh();
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(pollInterval);
    };
  }, [docId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-black gap-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-indigo-100 dark:border-zinc-900 rounded-full" />
        <div className="absolute top-0 w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Analyzing Repository{dots}
        </h2>
        <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
          Our AI is scanning your codebase to generate architecture insights, API docs, and more. This usually takes 30-60 seconds.
        </p>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-600/20 animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}