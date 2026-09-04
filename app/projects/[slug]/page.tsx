import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { getMdxContent } from "@/lib/getMdxContent";
import { MDXRemote } from "next-mdx-remote/rsc";
import { generatePageMetadata } from "@/components/PageMetadata";
import { PageMetadata } from "@/components/PageMetadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), "content/projects");
  const files = fs.readdirSync(projectsDir);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(".md", "") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mdxData = await getMdxContent(slug, "projects");

  if (!mdxData) {
    return { title: "Project Not Found" };
  }

  return generatePageMetadata({
    title: mdxData.frontMatter.title,
    description: mdxData.frontMatter.description || mdxData.frontMatter.title,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const mdxData = await getMdxContent(slug, "projects");

  if (!mdxData) {
    notFound();
  }

  const { frontMatter } = mdxData;

  return (
    <>
      <PageMetadata
        breadcrumbs={[
          { name: "Home", url: "https://afikri.online" },
          { name: "Projects", url: "https://afikri.online/projects" },
          { name: frontMatter.title },
        ]}
      />

      <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          &larr; Back to Projects
        </Link>

        <h1 className="mb-4 mt-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
          {frontMatter.title}
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          {frontMatter.role && <span>{frontMatter.role}</span>}
          {frontMatter.role && frontMatter.year && (
            <span>&middot;</span>
          )}
          {frontMatter.year && <span>{frontMatter.year}</span>}
        </div>

        {frontMatter.tags && frontMatter.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {frontMatter.tags.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {frontMatter.link && (
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href={frontMatter.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-600"
            >
              Visit Project On Github &rarr;
            </a>

            {frontMatter.liveLink && (
              <a
                href={frontMatter.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-600"
              >
                See it live &rarr;
              </a>
            )}

            {frontMatter.apiDocsLink && (
              <a
                href={frontMatter.apiDocsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-600"
              >
                API Documentation &rarr;
              </a>
            )}
          </div>
        )}

        <hr className="my-10 border-gray-200" />

        <div className="prose prose-gray max-w-none prose-headings:tracking-tight prose-a:text-blue-600 prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote source={mdxData.source} />
        </div>
      </article>
    </>
  );
}
