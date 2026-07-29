import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/PageMetadata";
import { PageMetadata } from "@/components/PageMetadata";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "Backend & Systems Engineer with 10+ years building enterprise information systems, APIs, and data platforms for governments, UN agencies, and international NGOs.",
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

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pt-12 pb-4">
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
          Backend & Systems Engineer
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-black-500">
          10+ years building enterprise information systems, APIs, and data
          platforms for governments, UN agencies, and international NGOs.
        </p>
      </section>

      <section className="border-t border-black-200 bg-black-50">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-black-500">
            Professional Summary
          </h2>
          <p className="text-base leading-relaxed text-black">
            Backend & Systems Engineer with over a decade of experience
            developing enterprise information systems, backend services, APIs,
            and database-driven platforms. Specialized in backend architecture,
            interoperability systems, and structured data workflows. Proven
            track record building scalable solutions for organizations like
            UNICEF, IOM, and BNPB using Python, PHP, FastAPI, Django, and
            Laravel.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-black-500">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <article className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-black">Backend</h3>
              <p className="text-base leading-relaxed text-black-500">
                Python, PHP, FastAPI, Django, Laravel, REST APIs, Microservices
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-black">Frontend</h3>
              <p className="text-base leading-relaxed text-black-500">
                React, Next.js, TypeScript
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-black">Databases</h3>
              <p className="text-base leading-relaxed text-black-500">
                PostgreSQL, MySQL, SQL Server, NoSQL
              </p>
            </article>

            <article className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-black">
                Infrastructure & DevOps
              </h3>
              <p className="text-base leading-relaxed text-black-500">
                Docker, Kubernetes, Redis, Git, Linux, Grafana
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-black-200">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-black-500">
            Experience
          </h2>

          <ul className="flex flex-col gap-8">
            <li className="flex flex-col gap-1">
              <p className="text-base font-semibold text-black">
                Program Specific Researcher (Database Officer)
              </p>
              <p className="text-sm text-black-500">
                Maritime Asian Heritage Survey, Kyoto, Japan &mdash; 2024 &ndash; 2026
              </p>
            </li>
            <li className="flex flex-col gap-1">
              <p className="text-base font-semibold text-black">
                Software Engineering Specialist
              </p>
              <p className="text-sm text-black-500">
                BNPB &ndash; Indonesian Disaster Resilience Initiative &mdash; 2023 &ndash; 2024
              </p>
            </li>
            <li className="flex flex-col gap-1">
              <p className="text-base font-semibold text-black">
                Full Stack Programmer
              </p>
              <p className="text-sm text-black-500">
                UNICEF Indonesia &mdash; 2021
              </p>
            </li>
            <li className="flex flex-col gap-1">
              <p className="text-base font-semibold text-black">
                Database System Administrator
              </p>
              <p className="text-sm text-black-500">
                International Organization for Migration (IOM) &mdash; 2017 &ndash; 2018
              </p>
            </li>
          </ul>

          <div className="pt-2">
            <a
              href="#"
              className="inline-flex h-11 items-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-black-200 bg-black-50">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-20">
          <h2 className="text-sm font-medium uppercase tracking-widest text-black-500">
            Education
          </h2>
          <ul className="flex flex-col gap-4">
            <li className="flex flex-col gap-1">
              <p className="text-base font-semibold text-black">
                Postgraduate in Entrepreneurship and Innovation
              </p>
              <p className="text-sm text-black-500">
                University of Adelaide, Australia
              </p>
            </li>
            <li className="flex flex-col gap-1">
              <p className="text-base font-semibold text-black">
                Bachelor of Applied Computer Science
              </p>
              <p className="text-sm text-black-500">
                Free University of Bozen-Bolzano, Italy
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
