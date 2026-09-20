import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getMdxContent } from "@/lib/getMdxContent";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeBlock from "@/components/blog/CodeBlock";
import { generatePageMetadata } from "@/components/PageMetadata";
import { ArticleJsonLd } from "@/components/JsonLd";

const SITE_URL = "https://afikri.online";

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
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
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
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
    ? (rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`)
    : undefined;
  const dateStr = frontMatter.date || frontMatter.publishedAt;

  return generatePageMetadata({
    title: frontMatter.title,
    description:
      frontMatter.description || frontMatter.title,
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
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-black-500">Post not found</p>
      </div>
    );
  }

  const { frontMatter } = mdxData;
  const dateStr = frontMatter.date || frontMatter.publishedAt;
  const dateISO = parseDateToISO(dateStr);
  const rawImage = frontMatter.imgUrl || frontMatter.imageUrl;
  const imageUrl = rawImage
    ? (rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`)
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

      <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
          {frontMatter.title}
        </h1>
        <div className="mb-8 text-gray-600">
          {frontMatter.author && (
            <p>
              <strong>Author:</strong> {frontMatter.author}
            </p>
          )}
          {dateStr && (
            <p>
              <strong>Date:</strong> {dateStr}
            </p>
          )}
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="prose prose-black max-w-none text-justify">
          <MDXRemote
            source={mdxData.source}
            components={{
              code: (props: React.HTMLAttributes<HTMLElement>) => (
                <CodeBlock {...props} children={props.children ?? ""} />
              ),
            }}
          />
        </div>
      </article>
    </>
  );
}
