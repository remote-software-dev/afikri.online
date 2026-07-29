import Link from "next/link";
import { PersonJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <PersonJsonLd />

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 pt-12 pb-20">
        <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
          Building things for the web.
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-black-500">
          Developer focused on clean code, fast interfaces, and tools that
          ship. Currently working with TypeScript, React, and whatever gets
          the job done.
        </p>
        <div>
          <Link
            href="/projects"
            className="inline-flex h-11 items-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            View Projects
          </Link>
        </div>
      </section>
    </>
  );
}
