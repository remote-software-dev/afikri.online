import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getMdxContent } from "@/lib/getMdxContent";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/CodeBlock";
import { generatePageMetadata } from "@/components/PageMetadata";
import { ArticleJsonLd } from "@/components/JsonLd";
import {
  Callout,
  PhaseCard,
  SkillBadge,
} from "@/components/blog/MdxBlocks";
import RoadmapTimeline from "@/components/blog/RoadmapTimeline";

const SITE_URL = "https://afikri.online";

const MONTHS: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function parseDateToISO(dateStr?: string): string {
  if (!dateStr) {
    return new Date().toISOString();
  }
  const match = dateStr.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    const monthIndex = MONTHS[month];
    if (monthIndex !== undefined) {
      return new Date(Date.UTC(Number(year), monthIndex, Number(day))).toISOString();
    }
  }
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

/**
 * The page renders the post title from frontmatter as the single <h1>.
 * MDX bodies should therefore never include their own top-level `# Title`.
 * This defensively strips a leading H1 (if one exists) so the title can
 * never render twice, regardless of how the content file is authored.
 */
function stripLeadingTitleHeading(source: string): string {
  const lines = source.replace(/^\s+/, "").split("\n");
  if (lines[0] && /^#\s+/.test(lines[0])) {
    lines.shift();
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }
    return lines.join("\n");
  }
  return source;
}

interface FrontMatter {
  title: string;
  description?: string;
  author?: string;
  date?: string;
  publishedAt?: string;
  imgUrl?: string;
  imageUrl?: string;
  tags?: string[];
}

interface MdxData {
  source: string;
  frontMatter: FrontMatter;
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content/blogs");
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  return files
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((filename) => ({
      slug: filename.replace(/\.(md|mdx)$/, ""),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mdxData: MdxData | null = await getMdxContent(slug);

  if (!mdxData) return {};

  const { frontMatter } = mdxData;
  const rawImage = frontMatter.imgUrl || frontMatter.imageUrl;
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${SITE_URL}${rawImage}`
    : undefined;
  const dateStr = frontMatter.date || frontMatter.publishedAt;

  return generatePageMetadata({
    title: frontMatter.title,
    description: frontMatter.description || frontMatter.title,
    path: `/blogs/${slug}`,
    image: imageUrl,
    type: "article",
    publishedTime: parseDateToISO(dateStr),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mdxData: MdxData | null = await getMdxContent(slug);

  if (!mdxData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  const { frontMatter } = mdxData;
  const source = stripLeadingTitleHeading(mdxData.source);
  const dateStr = frontMatter.date || frontMatter.publishedAt;
  const dateISO = parseDateToISO(dateStr);
  const rawImage = frontMatter.imgUrl || frontMatter.imageUrl;
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${SITE_URL}${rawImage}`
    : undefined;

  return (
    <>
      <ArticleJsonLd
        title={frontMatter.title}
        description={frontMatter.description}
        image={imageUrl}
        datePublished={dateISO}
        url={`${SITE_URL}/blogs/${slug}`}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <header className="mb-10">
          {frontMatter.tags && frontMatter.tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {frontMatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
            {frontMatter.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
            {frontMatter.author && (
              <span className="font-medium text-gray-700">
                {frontMatter.author}
              </span>
            )}
            {frontMatter.author && dateStr && <span aria-hidden>·</span>}
            {dateStr && <time dateTime={dateISO}>{dateStr}</time>}
          </div>
        </header>

        <hr className="mb-10 border-gray-200" />

        <div className="prose prose-lg prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:font-medium prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-blue-300 prose-blockquote:font-normal prose-blockquote:not-italic prose-img:rounded-xl [&_table]:block [&_table]:overflow-x-auto">
          <MDXRemote
            source={source}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            components={{
              Callout,
              PhaseCard,
              RoadmapTimeline,
              SkillBadge,
              code: ({
                children,
                ...props
              }: React.HTMLAttributes<HTMLElement>) => (
                <CodeBlock {...props}>{children ?? ""}</CodeBlock>
              ),
            }}
          />
        </div>
      </article>
    </>
  );
}
