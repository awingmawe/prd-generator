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

  if (!content) return null;

  return (
    <div className="relative">
      <div className="sticky top-24 z-20 flex justify-end mb-4">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-500" /> Copied!
            </>
          ) : (
            <>
              <Copy size={16} /> Copy as Prompt
            </>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm p-8 md:p-12 overflow-hidden">
        <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:border-b prose-h2:pb-2 prose-zinc:dark:text-zinc-300">
          <ReactMarkdown
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-mermaid/.exec(className || "");
                if (match) {
                  return <Mermaid chart={String(children).replace(/\n$/, "")} />;
                }
                return (
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              },
              pre({ children }) {
                return <div className="my-6">{children}</div>;
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
