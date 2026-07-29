import Link from "next/link";
import { PersonJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <PersonJsonLd />

      <section className="mx-auto max-w-3xl px-6 py-12 md:py-20">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
          Building things for the web.
        </h1>
        <p className="mb-12 text-xl leading-relaxed text-gray-600">
          Developer focused on clean code, fast interfaces, and tools that
          ship. Currently working with TypeScript, React, and whatever gets
          the job done.
        </p>
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center bg-black px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
          >
            View Projects
          </Link>
        </div>
      </section>
    </>
  );
}
