import fs from "fs";
import path from "path";
import matter from "gray-matter";

type FrontMatter = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  author?: string;
  role?: string;
  year?: string;
  link?: string;
  liveLink?: string;
  apiDocsLink?: string;
};

type ContentType = "blogs" | "projects";

export async function getMdxContent(slug: string, contentType: ContentType = "blogs") {
  const filePath = path.join(process.cwd(), "content", contentType, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");

  const { content, data: frontMatter } = matter(fileContents);

  return {
    source: content,
    frontMatter: frontMatter as FrontMatter,
  };
}