import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "@/data/projects";
import { generatePageMetadata } from "@/components/PageMetadata";
import { PageMetadata } from "@/components/PageMetadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageMetadata
        breadcrumbs={[
          { name: "Home", url: "https://afikri.online" },
          { name: "Projects", url: "https://afikri.online/projects" },
          { name: project.title },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <section className="mb-12">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            &larr; Back to Projects
          </Link>

          <h1 className="mb-6 mt-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
            {project.title}
          </h1>

          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-base font-medium text-gray-700">
              {project.role}
            </p>
            <span className="hidden text-gray-300 sm:inline">&middot;</span>
            <p className="text-base text-gray-500">{project.year}</p>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-black px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
            >
              Visit Project &rarr;
            </a>
          )}
        </section>

        <section className="mb-10">
          <p className="text-lg leading-relaxed text-gray-700 text-justify">
            {project.longDescription}
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-black md:text-3xl">
            Technologies
          </h2>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="inline-flex h-7 items-center rounded border border-gray-200 px-3 text-sm text-gray-600"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
