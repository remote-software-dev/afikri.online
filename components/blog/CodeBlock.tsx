"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className = "", children }) => {
  const language = className.replace("language-", "");
  const codeString = Array.isArray(children) ? children.join("") : children;

  if (!language) {
    return (
      <code className={className}>
        {String(codeString).trim()}
      </code>
    );
  }

  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      PreTag="pre"
      customStyle={{ padding: "10px", borderRadius: "5px" }}
    >
      {String(codeString).trim()}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;