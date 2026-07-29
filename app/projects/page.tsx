import Link from "next/link";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/PageMetadata";
import { PageMetadata } from "@/components/PageMetadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description:
    "Selected projects by afikri — clean, fast web applications built with TypeScript, React, and Next.js.",
  path: "/projects",
});

const projects = [
  {
    title: "afikri.online",
    description:
      "This site. Minimalist by design. Built with Next.js and Tailwind with strict attention to typography and whitespace.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    href: "https://afikri.online",
  },
  {
    title: "Project Two",
    description:
      "A brief description of another project goes here. Focus on what it does, who it serves, and the problem it solves.",
    tags: ["React", "Node.js"],
    href: "#",
  },
  {
    title: "Project Three",
    description:
      "Another project description. Keep it short, clear, and focused on outcomes rather than implementation details.",
    tags: ["Python", "PostgreSQL"],
    href: "#",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageMetadata
        breadcrumbs={[
          { name: "Home", url: "https://afikri.online" },
          { name: "Projects" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <section className="mb-12">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
            Projects
          </h1>
          <p className="text-xl leading-relaxed text-gray-600">
            Selected work — clean, fast web applications built with TypeScript,
            React, and intentional design.
          </p>
        </section>

        <div className="border-b border-gray-100 my-12" />

        <section>
          <div className="flex flex-col gap-8">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex flex-col gap-3 border-b border-gray-200 pb-8 last:border-b-0 last:pb-0"
              >
                <h2 className="text-2xl font-bold text-black md:text-3xl">
                  {project.title}
                </h2>
                <p className="text-base leading-relaxed text-gray-600">
                  {project.description}
                </p>
                <ul className="flex gap-2 pt-1" aria-label="Technologies used">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="inline-flex h-6 items-center rounded border border-gray-200 px-2 text-xs text-gray-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="pt-1">
                  <Link
                    href={project.href}
                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                  >
                    View &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
