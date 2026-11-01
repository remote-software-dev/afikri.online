import Link from "next/link";
import Image from "next/image";
import { PersonJsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <PersonJsonLd />

      <section className="mx-auto w-full max-w-5xl px-6 pt-4 pb-14 md:pt-6 md:pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight text-black md:text-7xl md:leading-[1.05]">
              Building scalable backend systems.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
              I specialize in Python, backend architecture, and automation. I
              write clean code and build systems that don&apos;t break.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-7 py-3 font-mono text-sm uppercase tracking-wider text-white transition-colors hover:bg-blue-700"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-black bg-white px-7 py-3 font-mono text-sm uppercase tracking-wider text-black transition-colors hover:bg-neutral-50"
              >
                Contact Me
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/afikri.jpeg"
              alt="Afikri"
              width={500}
              height={500}
              priority
              className="mx-auto h-auto w-4/5 rounded-2xl border border-neutral-200 object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
