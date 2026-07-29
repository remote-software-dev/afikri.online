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
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-black">Most Popular Posts</h3>
      <ul className="space-y-3">
        {postList.map((post, index) => (
          <li key={index}>
            <a
              href="#"
              className="text-gray-600 transition-colors hover:text-black"
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
