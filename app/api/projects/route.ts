import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content/projects");

async function getProjects() {
  try {
    const files = await fs.readdir(projectsDir);
    const projects = await Promise.all(
      files
        .filter((filename) => filename.endsWith(".md"))
        .map(async (filename) => {
          const filePath = path.join(projectsDir, filename);
          const fileContent = await fs.readFile(filePath, "utf-8");
          const { data, content } = matter(fileContent);

          return {
            slug: filename.replace(".md", ""),
            title: data.title || "Untitled",
            date: data.date || "Unknown date",
            author: data.author || "afikri",
            tags: data.tags || [],
            excerpt: data.excerpt || content.slice(0, 150) + "...",
          };
        })
    );

    return projects.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading projects:", error);
    return [];
  }
}

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
