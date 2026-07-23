import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content/blogs");

async function getBlogPosts() {
  try {
    const files = await fs.readdir(blogDir);
    const posts = await Promise.all(
      files
        .filter((filename) => filename.endsWith(".md"))
        .map(async (filename) => {
          const filePath = path.join(blogDir, filename);
          const fileContent = await fs.readFile(filePath, "utf-8");
          const { data, content } = matter(fileContent);

          return {
            slug: filename.replace(".md", ""),
            title: data.title || "Untitled",
            date: data.date || "Unknown date",
            author: data.author || "afikri",
            tags: data.tags || [],
            imageUrl: data.imageUrl || "/default-image.jpg",
            commentsCount: data.commentsCount || 0,
            likesCount: data.likesCount || 0,
            bookmarksCount: data.bookmarksCount || 0,
            excerpt: data.excerpt || content.slice(0, 150) + "...",
          };
        })
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}