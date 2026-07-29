"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  imageUrl: string;
  commentsCount: number;
  likesCount: number;
  bookmarksCount: number;
  excerpt: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postsPerPage = 4;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToShow = blogPosts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <section className="mb-12">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
          Blog
        </h1>
      </section>

      <div className="border-b border-gray-100 my-12" />

      <section>
        <div className="flex flex-col gap-8">
          {postsToShow.length > 0 ? (
            postsToShow.map((post) => (
              <BlogCard
                key={post.slug}
                imageUrl={post.imageUrl}
                tags={post.tags}
                title={post.title}
                author={post.author}
                date={post.date}
                content={post.excerpt}
                readMoreLink={`/blogs/${post.slug}`}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No blog posts found.</p>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
}
