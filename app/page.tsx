"use client";

import { useState } from "react";
import MinimalistPrompt from "@/components/MinimalistPrompt";
import PrdResult from "@/components/PrdResult";
import { GithubIcon } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setResult(""); // Clear previous result for a fresh look
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: "Project Analysis", 
          description: prompt, 
          features: "Detailed Analysis requested" 
        }),
      });

      if (!response.ok) throw new Error("Gagal memproses");

      const { result: prdResult } = await response.json();
      setResult(prdResult);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat membuat PRD.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900/30">
      {/* Subtle Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <div className="font-semibold text-sm tracking-tight pointer-events-auto opacity-40 hover:opacity-100 transition-opacity">
          PRD ARCHITECT v1.0
        </div>
        <a 
          href="https://github.com/awingmawe/prd-generator" 
          target="_blank"
          className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all pointer-events-auto opacity-40 hover:opacity-100"
        >
          <GithubIcon size={18} />
        </a>
      </header>

      {/* Hero Section */}
      <div className={`transition-all duration-700 ease-in-out ${result ? "pt-24 pb-12" : "pt-[30vh]"}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className={`text-center space-y-4 mb-12 transition-all duration-500 ${result ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Build your next <span className="text-zinc-400">masterpiece.</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              Satu kalimat untuk mengubah ide menjadi dokumen teknis yang detail, lengkap dengan arsitektur & diagram ERD.
            </p>
          </div>

          <MinimalistPrompt onGenerate={handleGenerate} isLoading={isLoading} />
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="max-w-5xl mx-auto px-6 pb-24 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="mt-12">
            <PrdResult content={result} />
          </div>
        </div>
      )}

      {/* Footer Decoration */}
      {!result && !isLoading && (
        <div className="fixed bottom-12 w-full text-center text-[10px] uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-800 font-bold">
          Empowered by Artificial Intelligence
        </div>
      )}
    </div>
  );
}
