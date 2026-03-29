"use client";

import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import Mermaid from "./Mermaid";

interface PrdResultProps {
  content: string;
}

export default function PrdResult({ content }: PrdResultProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) {
    return (
      <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-12 text-zinc-400">
        Hasil PRD akan muncul di sini...
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-zinc-700 transition-colors shadow-lg"
        >
          {copied ? (
            <>
              <Check size={14} /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy as Prompt
            </>
          )}
        </button>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none p-8 bg-zinc-50 dark:bg-zinc-950 border rounded-xl shadow-inner min-h-[600px]">
        <ReactMarkdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-mermaid/.exec(className || "");
              if (match) {
                return <Mermaid chart={String(children).replace(/\n$/, "")} />;
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
