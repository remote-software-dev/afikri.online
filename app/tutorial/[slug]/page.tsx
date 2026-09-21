import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getTutorialBySlug,
  getAllTutorialSlugs,
} from "@/data/tutorials";
import {
  buildMdxToc,
  getAllMdxTutorials,
  getMdxContent,
  sanitizeTutorialMdx,
  slugifyHeading,
} from "@/lib/getMdxContent";
import { generatePageMetadata, PageMetadata } from "@/components/PageMetadata";
import TutorialDocumentation from "@/components/tutorial/TutorialDocumentation";
import TutorialMdxDocumentation from "@/components/tutorial/TutorialMdxDocumentation";
import CodeBlock from "@/components/CodeBlock";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const mdxSlugs = getAllMdxTutorials().map((tutorial) => tutorial.slug);
  const slugs = Array.from(new Set([...mdxSlugs, ...getAllTutorialSlugs()]));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mdxData = await getMdxContent(slug, "tutorials");

  if (mdxData) {
    return generatePageMetadata({
      title: `${mdxData.frontMatter.title} | Tutorial`,
      description: mdxData.frontMatter.description ?? mdxData.frontMatter.title,
      path: `/tutorial/${slug}`,
    });
  }

  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    return {
      title: "Tutorial Not Found",
    };
  }

  return generatePageMetadata({
    title: `${tutorial.title} | Tutorial`,
    description: tutorial.description,
    path: `/tutorial/${slug}`,
  });
}

function headingText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(headingText).join("");
  }
  if (children && typeof children === "object") {
    const node = children as { props?: { children?: React.ReactNode } };
    if (node.props?.children) {
      return headingText(node.props.children);
    }
  }
  return "";
}

const mdxComponents = {
  h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      id={slugifyHeading(headingText(children))}
      className="scroll-mt-24 text-4xl font-bold tracking-tight text-black"
    >
      {children}
    </h1>
  ),
  h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={slugifyHeading(headingText(children))}
      className="scroll-mt-24 text-2xl font-semibold tracking-tight text-black"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={slugifyHeading(headingText(children))}
      className="scroll-mt-24 text-xl font-semibold tracking-tight text-black"
    >
      {children}
    </h3>
  ),
  code: ({ children, ...rest }: React.HTMLAttributes<HTMLElement>) => (
    <CodeBlock {...rest}>{children ?? ""}</CodeBlock>
  ),
};

export default async function TutorialDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mdxData = await getMdxContent(slug, "tutorials");

  if (mdxData) {
    const source = sanitizeTutorialMdx(
      mdxData.source,
      mdxData.frontMatter.title
    );
    const toc = buildMdxToc(source);

    return (
      <>
        <PageMetadata
          breadcrumbs={[
            { name: "Home", url: "https://afikri.online" },
            { name: "Tutorials", url: "https://afikri.online/tutorial" },
            { name: mdxData.frontMatter.title },
          ]}
        />
        <TutorialMdxDocumentation
          title={mdxData.frontMatter.title}
          description={mdxData.frontMatter.description}
          toc={toc}
        >
          <MDXRemote source={source} components={mdxComponents} />
        </TutorialMdxDocumentation>
      </>
    );
  }

  const tutorial = getTutorialBySlug(slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <>
      <PageMetadata
        breadcrumbs={[
          { name: "Home", url: "https://afikri.online" },
          { name: "Tutorials", url: "https://afikri.online/tutorial" },
          { name: tutorial.title },
        ]}
      />
      <TutorialDocumentation tutorial={tutorial} />
    </>
  );
}