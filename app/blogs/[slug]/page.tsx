import type { Metadata } from "next";
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

function parseDateToISO(dateStr: string): string {
  const match = dateStr.match(/^(\d{1,2})\s+(\w+)\s+(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(Number(year), MONTHS[month], Number(day)).toISOString();
  }
  return new Date(dateStr).toISOString();
}

interface FrontMatter {
  title: string;
  description?: string;
  author?: string;
  date: string;
  imgUrl?: string;
  tags?: string[];
}

interface MdxData {
  source: string;
  frontMatter: FrontMatter;
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
  const imageUrl = frontMatter.imgUrl
    ? `${SITE_URL}${frontMatter.imgUrl}`
    : undefined;

  return generatePageMetadata({
    title: frontMatter.title,
    description:
      frontMatter.description || frontMatter.title,
    path: `/blogs/${slug}`,
    image: imageUrl,
    type: "article",
    publishedTime: parseDateToISO(frontMatter.date),
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
  const dateISO = parseDateToISO(frontMatter.date);

  return (
    <>
      <ArticleJsonLd
        title={frontMatter.title}
        description={frontMatter.description}
        image={
          frontMatter.imgUrl ? `${SITE_URL}${frontMatter.imgUrl}` : undefined
        }
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
          <p>
            <strong>Date:</strong> {frontMatter.date}
          </p>
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
