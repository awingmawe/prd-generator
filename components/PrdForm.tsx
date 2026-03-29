"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface PrdFormProps {
  onGenerate: (data: { name: string; description: string; features: string }) => Promise<void>;
  isLoading: boolean;
}

export default function PrdForm({ onGenerate, isLoading }: PrdFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return;
    await onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-zinc-900 border rounded-xl shadow-sm">
      <div>
        <label className="block text-sm font-medium mb-2">Nama Proyek</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Misal: Parkee New CMS"
          className="w-full p-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Deskripsi Singkat</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Apa tujuan utama aplikasi ini?"
          rows={3}
          className="w-full p-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Fitur Utama</label>
        <textarea
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="Sebutkan fitur-fitur kuncinya (pisahkan dengan baris baru)"
          rows={5}
          className="w-full p-2.5 rounded-lg border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.name || !formData.description}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Generating PRD...
          </>
        ) : (
          <>
            <Send size={18} /> Generate PRD & Diagrams
          </>
        )}
      </button>
    </form>
  );
}
