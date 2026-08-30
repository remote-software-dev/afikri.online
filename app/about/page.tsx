import type { Metadata } from "next";
import { generatePageMetadata } from "@/components/PageMetadata";
import { PageMetadata } from "@/components/PageMetadata";

export const metadata: Metadata = generatePageMetadata({
  title: "About",
  description:
    "Software Engineer — Full Stack Developer with 10+ years building web applications, APIs, databases, and enterprise software for governments, UN agencies, and international NGOs.",
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

      <div className="mx-auto max-w-3xl px-6 py-12 text-justify md:py-20">
        {/* Header */}
        <section className="mb-12">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
            Software Engineer &mdash; Full Stack Developer
          </h1>
          <p className="mb-12 text-xl leading-relaxed text-gray-600">
            10+ years building web applications, APIs, databases, and enterprise
            software for governments, UN agencies, and international NGOs.
          </p>
        </section>

        <div className="border-b border-gray-100 my-12" />

        {/* Professional Summary */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-black md:text-3xl">
            Professional Summary
          </h2>
          <p className="mb-6 text-base leading-relaxed text-gray-700 md:text-lg">
            Fullstack Software Engineer with 10+ years of experience designing
            and developing web applications, APIs, databases, and enterprise
            software solutions for governments, UN agencies, international NGOs,
            and independent products. Strong hands-on experience with Next.js,
            React, TypeScript, Tailwind CSS, PostgreSQL, Prisma, FastAPI, and
            REST APIs, with current focus on building full-stack and AI-powered
            applications. Experienced across the full software development
            lifecycle, from system architecture and database design to
            application development, API integration, testing, deployment, and
            production support.
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
                Frontend
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                React, Next.js, TypeScript, Tailwind CSS, Responsive Design
              </p>
            </article>

            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                Backend &amp; APIs
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                FastAPI, Python, Node.js, PHP, Laravel, Django, RESTful APIs,
                Auth Systems, JSON
              </p>
            </article>

            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                Databases &amp; ORM
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                PostgreSQL, Prisma, MySQL, Schema Design, Data Modeling
              </p>
            </article>

            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                AI &amp; Automation
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                AI Powered Applications, AI/ML API Integration, Workflow
                Automation
              </p>
            </article>

            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                Software Engineering
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                Software Architecture, System Analysis, Requirements
                Engineering, SDLC, QA Testing
              </p>
            </article>

            <article>
              <h3 className="mb-2 text-base font-semibold text-black">
                DevOps &amp; Tools
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                Git, Docker, Linux, Redis
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
            {/* Experience 0 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Software Engineer &amp; Product Developer
                </p>
                <p className="text-sm text-gray-500">
                  Jun 2026 &ndash; Present
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                Product Development &amp; Cosnulting, Indonesia
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Design and deliver production ready full stack web applications using TypeScript,
                  Next.js, React, FastAPI, PostgreSQL, Prisma, and Tailwind CSS from architecture through deployment.
                </li>
                <li className="text-base leading-relaxed">
                  Build scalable backend APIs, authentication, and application workflows that improve software maintainability
                  and support secure user facing services.
                </li>
                <li className="text-base leading-relaxed">
                  Architect relational PostgreSQL databases and Prisma ORM models that ensure data consistency
                  and simplify future feature development.
                </li>
                <li className="text-base leading-relaxed">
                  Integrate AI powered functionality and workflow automation into web applications,
                  reducing manual processing and enhancing user productivity.
                </li>
                <li className="text-base leading-relaxed">
                  Provide technical consulting on application architecture, API integration, and database design
                  for software development projects using Next.js and TypeScript.
                </li>
                <li className="text-base leading-relaxed">
                  Manage the complete software development lifecycle, including requirements analysis,
                  system design, implementation, testing, deployment, and continuous product improvement
                </li>
              </ul>
            </div>

            {/* Experience 1 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Program Specific Researcher (Database Officer)
                </p>
                <p className="text-sm text-gray-500">
                  Dec 2024 &ndash; Mar 2026
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                Maritime Asian Heritage Survey, Kyoto, Japan
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Managed and maintained structured cultural heritage data in the Arches platform, improving data integrity, consistency, and accessibility for an international research initiative.
                </li>
                <li className="text-base leading-relaxed">
                  Designed and maintained database schemas that accommodated evolving research requirements while preserving long-term data integrity.
                </li>
                <li className="text-base leading-relaxed">
                  Implemented validation rules and data quality workflows that improved consistency across heritage records and metadata.
                </li>
                <li className="text-base leading-relaxed">
                  Developed structured data ingestion, metadata standardization, and extraction workflows that streamlined research data processing.
                </li>
                <li className="text-base leading-relaxed">
                  Resolved database integrity issues and supported reporting workflows used by researchers and project stakeholders.
                </li>
                <li className="text-base leading-relaxed">
                  Produced technical documentation that improved knowledge transfer and operational continuity across the project team.
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
                  Aug 2023 &ndash; Jan 2024
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                BNPB &ndash; Indonesian Disaster Resilience Initiative
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Contributed to the system architecture and application design of Indonesia's Multi-Hazard Early Warning System, supporting a nationally integrated disaster resilience platform.
                </li>
                <li className="text-base leading-relaxed">
                  Prepared Software Requirements Specifications (SRS) that provided implementation vendors with clear functional and technical requirements.
                </li>
                <li className="text-base leading-relaxed">
                  Conducted gap analyses across application workflows, subsystem integration, and operational processes to identify implementation priorities.
                </li>
                <li className="text-base leading-relaxed">
                  Coordinated technical integration activities between engineering vendors and government stakeholders to support interoperable system delivery.
                </li>
              </ul>
            </div>

            {/* Experience 3 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Software Engineer &amp; Product Developer
                </p>
                <p className="text-sm text-gray-500">
                  Feb 2023 &ndash; Oct 2023
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                Product Development Consultant
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Designed and delivered Fullstack web applications that supported public health monitoring and government budget reporting,
                  enabling more efficient operational reporting workflows.
                </li>
                <li className="text-base leading-relaxed">
                  Developed frontend interfaces, backend services, and REST APIs using JavaScript, Laravel,
                  and MySQL, improving the usability and reliability of data driven applications.
                </li>
                <li className="text-base leading-relaxed">
                  Architected relational database schemas that improved data consistency, reporting accuracy,
                  and long-term application maintainability.
                </li>
                <li className="text-base leading-relaxed">
                  Supported production deployment and system integration with infrastructure engineers, help-
                  ing ensure stable application rollout and operational reliability.
                </li>
                <li className="text-base leading-relaxed">
                  Produced technical documentation and performed application testing that improved deploy-
                  ment readiness, knowledge transfer, and ongoing system maintenance.
                </li>
              </ul>
            </div>

            {/* Experience 4 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Software Engineer Consultant
                </p>
                <p className="text-sm text-gray-500">
                  May 2022 &ndash; Jan 2023
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                Madani Berkelanjutan
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Designed software architecture and digital platform solutions that supported multiple digital
                  transformation initiatives across government and development projects.
                </li>
                <li className="text-base leading-relaxed">
                  Implemented scalable web application infrastructure and platform services, improving the
                  reliability and maintainability of digital systems.
                </li>
                <li className="text-base leading-relaxed">
                  Translated business and operational requirements into fullstack application solutions that
                  streamlined organizational workflows and supported long term scalability.
                </li>
                <li className="text-base leading-relaxed">
                  Coordinated technical implementation across multiple projects, ensuring successful integra-
                  tion, delivery alignment, and timely execution of development priorities.
                </li>
              </ul>
            </div>

            {/* Experience 4 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Full Stack Programmer
                </p>
                <p className="text-sm text-gray-500">
                  Jun 2021 &ndash; Dec 2021
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                UNICEF Indonesia
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Developed and enhanced frontend and backend components for national monitoring dash-
                  boards used by Indonesian government stakeholders to monitor programs and support re-
                  porting and decision-making.
                </li>
                <li className="text-base leading-relaxed">
                  Integrated REST APIs and government information systems, enabling data exchange and
                  interoperability across multiple digital monitoring platforms.
                </li>
                <li className="text-base leading-relaxed">
                  Optimized dashboard interfaces and reporting workflows, reducing manual steps and improv-
                  ing usability for program and reporting teams.
                </li>
                <li className="text-base leading-relaxed">
                  Produced technical documentation, user manuals, and training materials that supported
                  nationwide system deployment and user adoption.
                </li>
                <li className="text-base leading-relaxed">
                  Investigated and resolved production issues across frontend and backend services, improving
                  system reliability and continuity of operations.
                </li>
                <li className="text-base leading-relaxed">
                  Supported RapidPro and ONA platforms used for digital data collection, reporting, and
                  operational information management.
                </li>
              </ul>
            </div>

            {/* Experience 6 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Database Management Consultant
                </p>
                <p className="text-sm text-gray-500">
                  Jan 2021 &ndash; May 2021
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                Save the Children Indonesia
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Designed and implemented information management workflows to structure, visualize, and
                  improve access to operational program data.
                </li>
                <li className="text-base leading-relaxed">
                  Built data processing pipelines supporting mobile data collection and near real-time reporting
                  from field activities.
                </li>
                <li className="text-base leading-relaxed">
                  Automated operational reporting workflows, reducing manual data preparation and accelerating monitoring
                  of program indicators.
                </li>
                <li className="text-base leading-relaxed">
                  Standardized data management processes to improve dataset consistency, reliability, and
                  accessibility for operational reporting and analysis.
                </li>
              </ul>
            </div>

            {/* Experience 6 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  ICT Associate
                </p>
                <p className="text-sm text-gray-500">
                  Dec 2018 &ndash; 2020
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                UNICEF Indonesia
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Developed digital monitoring and reporting systems with the Immunization Unit for Measles-
                  Rubella (MR) and Oral Polio Vaccine (OPV) vaccination campaigns, enabling centralized
                  tracking of campaign activities and vaccination data.

                </li>
                <li className="text-base leading-relaxed">
                  Built and maintained database-driven applications and data workflows that supported pro-
                  gram monitoring, reporting, and operational decision-making.
                </li>
                <li className="text-base leading-relaxed">Integrated and managed data across internal information systems, improving the availability
                  and consistency of operational data for program teams.
                </li>
                <li className="text-base leading-relaxed">Contributed to Enterprise Content Management (ECM) and
                  Multi-Factor Authentication(MFA) implementations, strengthening secure access to organizational
                  information and digital services.
                </li>
                <li className="text-base leading-relaxed">
                  Automated routine data and reporting tasks and produced technical documentation, reducing
                  manual operational work and improving continuity of system support
                </li>
              </ul>
            </div>

            {/* Experience 7 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Database System Administrator
                </p>
                <p className="text-sm text-gray-500">
                  Apr 2017 &ndash; Mar 2018
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                International Organization for Migration (IOM)
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Administered the RAMS enterprise database platform supporting migration operations and
                  operational information management, ensuring reliable access to critical program data.
                </li>
                <li className="text-base leading-relaxed">
                  Managed database integrity, user access controls, and operational workflows to maintain
                  platform reliability, data quality, and secure access.
                </li>
                <li className="text-base leading-relaxed">
                  Developed enhancements to database and web service components, expanding platform
                  functionality and streamlining data processing workflows.
                </li>
                <li className="text-base leading-relaxed">
                  Processed and transformed structured datasets using Python (Pandas), preparing data for
                  SQL ingestion and operational reporting pipelines.
                </li>
                <li className="text-base leading-relaxed">
                  Produced technical documentation and delivered user training, improving platform adoption
                  and enabling more effective operational support.
                </li>
              </ul>
            </div>

            {/* Experience 7 */}
            <div>
              <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-base font-semibold text-black">
                  Software Engineer & Product Developer
                </p>
                <p className="text-sm text-gray-500">
                  2010 &amp; 2016
                </p>
              </div>
              <p className="mb-3 text-sm text-gray-500">
                Product Development Consultant
              </p>
              <ul className="space-y-1.5 border-l-2 border-gray-100 pl-4 text-gray-600">
                <li className="text-base leading-relaxed">
                  Designed and delivered database driven web applications for monitoring, reporting, and
                  operational information management across multiple client projects.
                </li>
                <li className="text-base leading-relaxed">
                  Developed backend application logic, database components, and reporting functionality using
                  PHP, CodeIgniter/Laravel, MySQL, and SQL based technologies.
                </li>
                <li className="text-base leading-relaxed">
                  Designed and implemented data processing and reporting workflows that improved data
                  consistency and enabled more efficient operational analysis.
                </li>
                <li className="text-base leading-relaxed">
                  Integrated application components and external data sources to support end to end informa-
                  tion flows across client systems.
                </li>
                <li className="text-base leading-relaxed">
                  Coordinated application deployment and infrastructure implementation with technical teams,
                  taking solutions from development through production delivery
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="/Curriculum-Vitae.pdf"
              download="Abdul-Fikri-CV.pdf"
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
