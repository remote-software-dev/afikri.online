"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  className?: string;
  language?: string;
  code?: string;
  children?: React.ReactNode;
}

function resolveLanguage(className?: string, language?: string): string {
  if (language) return language;
  if (className) {
    const match = className.match(/(?:^|\s)language-([\w-]+)/);
    if (match) return match[1];
  }
  return "";
}

export default function CodeBlock({
  className,
  language,
  code,
  children,
}: CodeBlockProps) {
  const lang = resolveLanguage(className, language);
  const codeString =
    code ??
    (Array.isArray(children) ? children.join("") : children) ??
    "";

  if (!lang) {
    return <code className={className}>{String(codeString).trim()}</code>;
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-[#44475a]">
      <div className="flex items-center justify-between bg-[#21222c] px-4 py-2.5">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5555]" />
          <span className="h-3 w-3 rounded-full bg-[#f1fa8c]" />
          <span className="h-3 w-3 rounded-full bg-[#50fa7b]" />
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-[#6272a4]">
          {lang}
        </span>
      </div>
      <SyntaxHighlighter
        language={lang}
        style={dracula}
        PreTag="pre"
        customStyle={{
          margin: 0,
          padding: "1rem 1.25rem",
          borderRadius: 0,
          fontSize: "0.875rem",
          lineHeight: "1.625",
          background: "#282a36",
        }}
      >
        {String(codeString).trim()}
      </SyntaxHighlighter>
    </div>
  );
}