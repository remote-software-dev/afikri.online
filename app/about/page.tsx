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

      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        {/* Header */}
        <section className="mb-12">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
            Backend & Systems Engineer
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-gray-600">
            10+ years building enterprise information systems, APIs, and data
            platforms for governments, UN agencies, and international NGOs.
          </p>
        </section>

        <div className="border-b border-gray-100 my-12" />

        {/* Professional Summary */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-black md:text-3xl">
            Professional Summary
          </h2>
          <p className="mb-6 text-base leading-relaxed text-gray-700 md:text-lg">
            Backend & Systems Engineer with over a decade of experience
            developing enterprise information systems, backend services, APIs,
            and database-driven platforms. Specialized in backend architecture,
            interoperability systems, and structured data workflows. Proven
            track record building scalable solutions for organizations like
            UNICEF, IOM, and BNPB using Python, PHP, FastAPI, Django, and
            Laravel.
          </p>
        </section>

        <div className="border-b border-gray-100 my-12" />

        {/* Technical Skills */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-black md:text-3xl">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                Backend
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                Python, PHP, FastAPI, Django, Laravel, REST APIs, Microservices
              </p>
            </article>

            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                Frontend
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                React, Next.js, TypeScript
              </p>
            </article>

            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                Databases
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                PostgreSQL, MySQL, SQL Server, NoSQL
              </p>
            </article>

            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                Infrastructure & DevOps
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                Docker, Kubernetes, Redis, Git, Linux, Grafana
              </p>
            </article>
          </div>
        </section>

        <div className="border-b border-gray-100 my-12" />

        {/* Experience */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-black md:text-3xl">
            Experience
          </h2>

          <div className="flex flex-col gap-10">
            {/* Experience 1 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Program Specific Researcher (Database Officer)
                </p>
                <p className="text-sm text-gray-500">
                  2024 &ndash; 2026
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                Maritime Asian Heritage Survey, Kyoto, Japan
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Designed and managed databases for maritime heritage
                  documentation and archival workflows.
                </li>
                <li className="text-base leading-relaxed">
                  Built backend services and data pipelines for research data
                  processing and interoperability.
                </li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Software Engineering Specialist
                </p>
                <p className="text-sm text-gray-500">
                  2023 &ndash; 2024
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                BNPB &ndash; Indonesian Disaster Resilience Initiative
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Developed enterprise backend systems for disaster data
                  management and resilience planning.
                </li>
                <li className="text-base leading-relaxed">
                  Built APIs and integration layers connecting field data
                  collection with central information systems.
                </li>
              </ul>
            </div>

            {/* Experience 3 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Full Stack Programmer
                </p>
                <p className="text-sm text-gray-500">
                  2021
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                UNICEF Indonesia
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Developed and maintained full stack applications supporting
                  child welfare and program delivery.
                </li>
                <li className="text-base leading-relaxed">
                  Built RESTful APIs and database integrations for cross-system
                  data exchange.
                </li>
              </ul>
            </div>

            {/* Experience 4 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Database System Administrator
                </p>
                <p className="text-sm text-gray-500">
                  2017 &ndash; 2018
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                International Organization for Migration (IOM)
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Administered enterprise database systems supporting migration
                  data workflows and reporting.
                </li>
                <li className="text-base leading-relaxed">
                  Developed data processing pipelines and ETL procedures for
                  large-scale humanitarian data.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="#"
              className="inline-flex items-center bg-black px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
            >
              Download CV
            </a>
          </div>
        </section>

        <div className="border-b border-gray-100 my-12" />

        {/* Education */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-black md:text-3xl">
            Education
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-base font-semibold text-black">
                Postgraduate in Entrepreneurship and Innovation
              </p>
              <p className="text-sm text-gray-500">
                University of Adelaide, Australia
              </p>
            </div>
            <div>
              <p className="text-base font-semibold text-black">
                Bachelor of Applied Computer Science
              </p>
              <p className="text-sm text-gray-500">
                Free University of Bozen-Bolzano, Italy
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
