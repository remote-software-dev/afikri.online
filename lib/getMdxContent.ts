import fs from "fs";
import path from "path";
import matter from "gray-matter";

type FrontMatter = {
  title: string;
  description?: string;
  date?: string;
  publishedAt?: string;
  tags?: string[];
  author?: string;
  imgUrl?: string;
  imageUrl?: string;
  role?: string;
  year?: string;
  link?: string;
  liveLink?: string;
  apiDocsLink?: string;
};

type ContentType = "blogs" | "projects" | "tutorials";

export function readMdxContentSync(
  slug: string,
  contentType: ContentType = "blogs"
) {
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

export async function getMdxContent(slug: string, contentType: ContentType = "blogs") {
  return readMdxContentSync(slug, contentType);
}

export function getMdxSlugs(contentType: ContentType): string[] {
  const dir = path.join(process.cwd(), "content", contentType);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
}

export interface MdxTutorialSummary {
  slug: string;
  title: string;
  description: string;
}

export function getAllMdxTutorials(): MdxTutorialSummary[] {
  return getMdxSlugs("tutorials").map((slug) => {
    const data = readMdxContentSync(slug, "tutorials");
    return {
      slug,
      title: data?.frontMatter.title ?? slug,
      description: data?.frontMatter.description ?? "",
    };
  });
}

export interface MdxTocItem {
  id: string;
  title: string;
  children?: MdxTocItem[];
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s-]+/g, "-");
}

export function buildMdxToc(source: string): MdxTocItem[] {
  const toc: MdxTocItem[] = [];
  let current: MdxTocItem | null = null;

  for (const line of source.split("\n")) {
    const h1Match = line.match(/^#\s+(.+)$/);
    const h2Match = line.match(/^##\s+(.+)$/);

    if (h1Match) {
      const title = h1Match[1].trim();
      current = { id: slugifyHeading(title), title, children: [] };
      toc.push(current);
    } else if (h2Match && current) {
      const title = h2Match[1].trim();
      current.children!.push({ id: slugifyHeading(title), title });
    }
  }

  return toc;
}

export function sanitizeTutorialMdx(source: string, title: string): string {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const withoutTitle = source.replace(
    new RegExp(`^\\s*#\\s+${escaped}\\s*$`, "m"),
    ""
  );
  const withoutToc = withoutTitle.replace(
    /^#\s*Table of Contents\s*$[\s\S]*?^---\s*$/m,
    ""
  );
  return withoutToc.replace(/\n{3,}/g, "\n\n").trim();
}