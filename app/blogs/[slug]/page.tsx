import { getMdxContent } from "@/lib/getMdxContent";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeBlock from "@/components/blog/CodeBlock";

interface FrontMatter {
  title: string;
  author?: string;
  date: string;
}

interface MdxData {
  source: string;
  frontMatter: FrontMatter;
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
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pt-24 pb-20">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-black">
        {mdxData.frontMatter.title}
      </h1>
      <div className="mb-8 text-gray-500">
        {mdxData.frontMatter.author && (
          <p>
            <strong>Author:</strong> {mdxData.frontMatter.author}
          </p>
        )}
        <p>
          <strong>Date:</strong> {mdxData.frontMatter.date}
        </p>
      </div>

      <hr className="my-8 border-gray-200" />

      <div className="prose prose-gray max-w-none">
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
  );
}