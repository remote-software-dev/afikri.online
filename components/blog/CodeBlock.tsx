"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className = "", children }) => {
  const language = className.replace("language-", "") || "tsx";
  const codeString = Array.isArray(children) ? children.join("") : children;

  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      PreTag="div"
      customStyle={{ padding: "10px", borderRadius: "5px" }}
    >
      {String(codeString).trim()}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;