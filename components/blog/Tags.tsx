import React from "react";

const Tags: React.FC = () => {
  const tagList = ["Web Development", "TypeScript", "React", "Next.js", "Design"];

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tagList.map((tag, index) => (
          <span
            key={index}
            className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-primary/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
