import Link from "next/link";
import Image from "next/image";
import { Bot, Brain, Cloud, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PersonJsonLd } from "@/components/JsonLd";

interface Capability {
  icon: LucideIcon;
  backgroundClass: string;
  textClass: string;
  label: string;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    icon: Bot,
    backgroundClass: "bg-sky-100",
    textClass: "text-sky-900",
    label: "AI AGENTS",
    title: "Autonomous Workflows",
    description:
      "Building end-to-end AI agents and automation pipelines that execute complex business logic without human intervention.",
  },
  {
    icon: Brain,
    backgroundClass: "bg-amber-100",
    textClass: "text-amber-900",
    label: "LLM INTEGRATION",
    title: "RAG & Data Systems",
    description:
      "Connecting proprietary data to LLMs securely. Building retrieval-augmented generation systems that actually work.",
  },
  {
    icon: Server,
    backgroundClass: "bg-emerald-100",
    textClass: "text-emerald-900",
    label: "BACKEND",
    title: "Robust Engineering",
    description:
      "The solid Python, FastAPI, and API architecture required to make AI systems scale and handle real production load.",
  },
  {
    icon: Cloud,
    backgroundClass: "bg-indigo-100",
    textClass: "text-indigo-900",
    label: "INFRASTRUCTURE",
    title: "Cloud & DevOps",
    description:
      "Deploying and maintaining reliable AI infrastructure on GCP, AWS, Docker, and Kubernetes.",
  },
];

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

      <section className="mx-auto w-full max-w-5xl px-6 pt-12 pb-16 md:pt-16 md:pb-24">
        <h2 className="text-2xl font-bold text-black">Capabilities</h2>
        <div className="mt-8 grid grid-cols-1 gap-6">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.label}
                className={`rounded-3xl p-10 transition-transform duration-300 hover:scale-[1.02] ${capability.backgroundClass} ${capability.textClass}`}
              >
                <Icon className="h-10 w-10" aria-hidden="true" />
                <p className="mt-8 font-mono text-xs uppercase tracking-widest">
                  {capability.label}
                </p>
                <h3 className="mt-3 text-2xl font-bold">{capability.title}</h3>
                <p className="mt-4 leading-relaxed opacity-80">
                  {capability.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
