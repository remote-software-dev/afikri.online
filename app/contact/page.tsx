import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/PageMetadata";
import { PageMetadata } from "@/components/PageMetadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Get in touch with Afikri — developer available for projects, collaborations, and full-time opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageMetadata
        breadcrumbs={[
          { name: "Home", url: "https://Afikri.online" },
          { name: "Contact" },
        ]}
      />

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <section className="mb-12">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
            Contact
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-gray-600">
            Want to work together or have a question? Reach out and I will get
            back to you.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-gray-600">
              Available for new opportunities
            </span>
            <span className="text-gray-600">
              Usually responds within 24 hours
            </span>
          </div>
        </section>

        <div className="border-b border-gray-100 my-12" />

        <section className="mb-12">
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-black md:text-3xl">I can help you with</h2>
            <ul className="grid gap-3 text-base text-gray-600 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Full-stack Web Development
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                React & TypeScript Applications
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Freelance Projects & Consulting
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Code Reviews & Optimization
              </li>
            </ul>
          </div>
        </section>

        <div className="border-b border-gray-100 my-12" />

        <section>
          <h2 className="mb-6 text-2xl font-bold text-black md:text-3xl">Reach out directly</h2>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:fikri.abdul.jp@gmail.com"
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-sm font-semibold text-black group-hover:text-blue-600">fikri.abdul.jp@gmail.com</p>
              </div>
            </a>

            <a
              href="https://github.com/remote-software-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-400 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">GitHub</p>
                <p className="text-sm font-semibold text-black group-hover:text-blue-600">github.com/remote-software-dev</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/afikri"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">LinkedIn</p>
                <p className="text-sm font-semibold text-black group-hover:text-blue-600">linkedin.com/in/afikri</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
