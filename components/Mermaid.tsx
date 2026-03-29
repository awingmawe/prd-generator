"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    });
  }, []);

  useEffect(() => {
    if (isMounted && ref.current && chart) {
      try {
        ref.current.removeAttribute("data-processed");
        mermaid.contentLoaded();
      } catch (error) {
        console.error("Mermaid error:", error);
      }
    }
  }, [isMounted, chart]);

  if (!isMounted) return <div className="p-4 text-center text-zinc-400">Loading diagram...</div>;

  return (
    <div className="flex justify-center my-8 overflow-x-auto bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
      <div ref={ref} className="mermaid">
        {chart}
      </div>
    </div>
  );
}
