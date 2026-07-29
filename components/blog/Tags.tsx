import React from "react";

const Tags: React.FC = () => {
  const tagList = ["Web Development", "TypeScript", "React", "Next.js", "Design"];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-black">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tagList.map((tag, index) => (
          <span
            key={index}
            className="cursor-pointer rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-600 transition-colors hover:bg-blue-100"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;
