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

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pt-24 pb-20">
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
          Projects
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-black-500">
          Selected work — clean, fast web applications built with TypeScript,
          React, and intentional design.
        </p>
      </section>

      <section className="border-t border-black-200">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-20">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col gap-3 border-b border-black-200 pb-8 last:border-b-0 last:pb-0"
            >
              <h2 className="text-xl font-semibold text-black">
                {project.title}
              </h2>
              <p className="text-base leading-relaxed text-black-500">
                {project.description}
              </p>
              <ul className="flex gap-2 pt-1" aria-label="Technologies used">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex h-6 items-center rounded border border-black-200 px-2 text-xs text-black-500"
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
    </>
  );
}
