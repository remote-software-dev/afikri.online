import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/PageMetadata";
import { PageMetadata } from "@/components/PageMetadata";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "Learn about afikri — a developer building clean, fast web experiences with TypeScript, React, and intentional design.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageMetadata
        breadcrumbs={[
          { name: "Home", url: "https://afikri.online" },
          { name: "About" },
        ]}
      />

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pt-24 pb-20">
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
          About
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-gray-500">
          Developer building clean, fast web experiences with TypeScript,
          React, and intentional design. Focused on craft, performance, and
          shipping things that work.
        </p>
      </section>

      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Bio
          </h2>
          <p className="text-base leading-relaxed text-black">
            Software should be invisible when it works. The best interfaces
            are the ones you never think about — fast, clear, and
            predictable. That is the baseline, not the goal.
          </p>
          <p className="text-base leading-relaxed text-black">
            Every project starts with the problem, not the technology. Tools
            come and go. The constraints — performance budgets, accessibility
            requirements, team workflows — those stay. Build for them first.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Skills
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <article className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-black">Frontend</h3>
              <p className="text-base leading-relaxed text-gray-500">
                TypeScript, React, Next.js, Tailwind CSS. Component-driven
                architecture with an emphasis on type safety and minimal
                bundle size.
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-black">Backend</h3>
              <p className="text-base leading-relaxed text-gray-500">
                Node.js, Python, PostgreSQL. API design focused on
                predictability, error handling, and clear data contracts.
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-black">
                Infrastructure
              </h3>
              <p className="text-base leading-relaxed text-gray-500">
                Vercel, Docker, CI/CD pipelines. Deployment that is
                boring and reliable.
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-black">Principles</h3>
              <p className="text-base leading-relaxed text-gray-500">
                Accessibility is not a feature. Performance is not optional.
                Clean code is not a luxury — it is how you ship faster next
                time.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
