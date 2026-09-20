import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generatePageMetadata, PageMetadata } from "@/components/PageMetadata";
import { getAllTutorials } from "@/data/tutorials";

export const metadata: Metadata = generatePageMetadata({
  title: "Tutorials",
  description:
    "Practical tutorials and step-by-step guides on FastAPI, Python, Next.js, TypeScript, PostgreSQL, and modern software development.",
  path: "/tutorial",
});

export default function TutorialPage() {
  const tutorials = getAllTutorials();

  return (
    <>
      <PageMetadata
        breadcrumbs={[
          { name: "Home", url: "https://afikri.online" },
          { name: "Tutorials" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
            Tutorials
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.slug}
              href={`/tutorial/${tutorial.slug}`}
              className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg cursor-pointer"
            >
              <div className="flex h-full flex-col">
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black transition-colors group-hover:text-blue-600">
                      {tutorial.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {tutorial.description}
                  </p>
                </div>
                <div className="mt-4 flex justify-end text-blue-600 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {tutorials.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="mb-2 text-xl font-semibold text-black">
              No tutorials yet
            </h3>
            <p className="text-gray-600">Tutorials will appear here soon.</p>
          </div>
        )}
      </div>
    </>
  );
}
