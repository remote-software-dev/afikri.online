import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content/blogs");

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

function parseDateString(dateStr: string): number {
  const match = dateStr.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(Number(year), MONTHS[month], Number(day)).getTime();
  }
  return new Date(dateStr).getTime();
}

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
            imageUrl: data.imgUrl || data.imageUrl || "https://picsum.photos/seed/default/800/400",
            commentsCount: data.commentsCount || 0,
            likesCount: data.likesCount || 0,
            bookmarksCount: data.bookmarksCount || 0,
            excerpt: data.excerpt || content.slice(0, 150) + "...",
          };
        })
    );

    return posts.sort(
      (a, b) => parseDateString(b.date) - parseDateString(a.date)
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