import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getTutorialBySlug,
  getAllTutorialSlugs,
} from "@/data/tutorials";
import { generatePageMetadata, PageMetadata } from "@/components/PageMetadata";
import TutorialDocumentation from "@/components/tutorial/TutorialDocumentation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTutorialSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
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

export default async function TutorialDetailPage({ params }: PageProps) {
  const { slug } = await params;
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
