import React from "react";

const PopularPosts = () => {
  const postList = [
    "Introduction to Machine Learning",
    "Top 10 AI Trends in 2024",
    "Data Science for Beginners",
    "Advanced Neural Networks",
    "Exploring Big Data",
  ];

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Most Popular Posts</h3>
      <ul className="space-y-3">
        {postList.map((post, index) => (
          <li key={index}>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {post}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPosts;
