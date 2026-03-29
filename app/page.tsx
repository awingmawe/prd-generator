"use client";

import { useState } from "react";
import PrdForm from "@/components/PrdForm";
import PrdResult from "@/components/PrdResult";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (data: { name: string; description: string; features: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <header className="border-b bg-white dark:bg-zinc-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Sparkles size={24} />
            AI PRD & Diagram
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Sisi Kiri: Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Generate PRD in Seconds</h1>
              <p className="text-zinc-500 dark:text-zinc-400">
                Masukkan detail proyek Anda di bawah ini, dan AI kami akan menyusun PRD lengkap beserta diagram arsitektur dan ERD.
              </p>
            </div>
            <PrdForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Sisi Kanan: Hasil */}
          <div className="space-y-4 h-full">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Preview</h2>
            </div>
            <PrdResult content={result} />
          </div>
        </div>
      </div>
    </main>
  );
}
