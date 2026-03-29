"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

interface MinimalistPromptProps {
  onGenerate: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

export default function MinimalistPrompt({ onGenerate, isLoading }: MinimalistPromptProps) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="relative group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-300"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Jelaskan aplikasi yang ingin Anda buat (misal: Aplikasi E-commerce untuk UMKM dengan fitur loyalty point)..."
          className="w-full bg-transparent p-4 pr-16 text-lg outline-none resize-none min-h-[60px] max-h-[300px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="absolute right-3 bottom-3">
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all duration-200 shadow-lg"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <ArrowRight size={24} />
            )}
          </button>
        </div>
      </form>
      <div className="mt-4 flex gap-4 justify-center text-xs text-zinc-400 font-medium tracking-wide">
        <span className="flex items-center gap-1"><Sparkles size={12} /> AI-Powered Analysis</span>
        <span className="flex items-center gap-1">• System Architect Mode</span>
        <span className="flex items-center gap-1">• ERD Visualization</span>
      </div>
    </div>
  );
}
