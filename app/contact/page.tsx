import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/PageMetadata";
import { PageMetadata } from "@/components/PageMetadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Get in touch with afikri — developer available for projects, collaborations, and questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageMetadata
        breadcrumbs={[
          { name: "Home", url: "https://afikri.online" },
          { name: "Contact" },
        ]}
      />

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pt-24 pb-20">
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
          Contact
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-gray-500">
          Want to work together or have a question? Reach out and I will get
          back to you.
        </p>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-20">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium uppercase tracking-widest text-gray-500">
              Email
            </h2>
            <a
              href="mailto:hello@afikri.online"
              className="inline-flex h-11 w-fit items-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              hello@afikri.online
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium uppercase tracking-widest text-gray-500">
              GitHub
            </h2>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              github.com/afikri
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium uppercase tracking-widest text-gray-500">
              LinkedIn
            </h2>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              linkedin.com/in/afikri
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
