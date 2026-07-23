"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/blog/BlogCard";
import PopularPosts from "@/components/blog/PopularPosts";
import Tags from "@/components/blog/Tags";
import Pagination from "@/components/blog/Pagination";
import { formatDate } from "@/lib/utils";

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
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 pt-24 pb-20">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-8">
        Blog
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
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
            <p className="text-center text-muted-foreground">No blog posts found.</p>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <aside className="lg:col-span-1 space-y-8">
          <PopularPosts />
          <Tags />
        </aside>
      </div>
    </section>
  );
}
