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

const CONTENT_EXTENSIONS = [".md", ".mdx"] as const;

export function readMdxContentSync(
  slug: string,
  contentType: ContentType = "blogs"
) {
  const dir = path.join(process.cwd(), "content", contentType);
  const extension =
    CONTENT_EXTENSIONS.find((ext) => fs.existsSync(path.join(dir, `${slug}${ext}`))) ??
    ".md";
  const filePath = path.join(dir, `${slug}${extension}`);
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
    .filter((filename) => CONTENT_EXTENSIONS.some((ext) => filename.endsWith(ext)))
    .map((filename) => filename.replace(/\.(md|mdx)$/, ""));
}

export interface MdxTutorialSummary {
  slug: string;
  title: string;
  description: string;
  date?: string;
}

export function getAllMdxTutorials(): MdxTutorialSummary[] {
  return getMdxSlugs("tutorials").map((slug) => {
    const data = readMdxContentSync(slug, "tutorials");
    return {
      slug,
      title: data?.frontMatter.title ?? slug,
      description: data?.frontMatter.description ?? "",
      date: data?.frontMatter.publishedAt ?? data?.frontMatter.date,
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

const GENERIC_SECTION_LABELS = new Set([
  "topics",
  "goal",
  "example",
  "summary",
  "key takeaway",
  "key principle",
  "chapters",
  "practices",
  "mistakes",
  "example project",
  "discussion",
  "workflow stages",
  "debugging checklist",
  "ai review checklist",
  "development stack",
  "key lessons",
  "upcoming articles",
]);

function isGenericSectionLabel(title: string): boolean {
  return GENERIC_SECTION_LABELS.has(title.trim().toLowerCase());
}

export function buildMdxToc(source: string): MdxTocItem[] {
  const lines = source.split("\n");
  const hasNumberedChapters = lines.some((line) => /^##\s+\d+\./.test(line));

  const toc: MdxTocItem[] = [];
  let current: MdxTocItem | null = null;

  for (const line of lines) {
    const h1Match = line.match(/^#\s+(.+)$/);
    const h2Match = line.match(/^##\s+(.+)$/);

    if (h1Match) {
      const title = h1Match[1].trim();
      current = { id: slugifyHeading(title), title, children: [] };
      toc.push(current);
    } else if (h2Match) {
      const title = h2Match[1].trim();
      if (isGenericSectionLabel(title)) continue;
      if (hasNumberedChapters && !/^\d+\./.test(title)) continue;
      const item: MdxTocItem = { id: slugifyHeading(title), title };
      if (current) {
        current.children!.push(item);
      } else {
        toc.push(item);
      }
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