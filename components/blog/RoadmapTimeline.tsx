"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  FileText,
  Gauge,
  Layers,
  Lock,
  MessagesSquare,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

type IconType = ComponentType<{ className?: string }>;

const ACCENTS = {
  blue: {
    gradient: "from-blue-500 to-cyan-400",
    soft: "bg-blue-50",
    softText: "text-blue-700",
    border: "border-blue-100",
    bar: "bg-gradient-to-r from-blue-500 to-cyan-400",
    icon: "text-blue-600",
    shadow: "hover:shadow-blue-200/70",
  },
  purple: {
    gradient: "from-violet-500 to-fuchsia-500",
    soft: "bg-violet-50",
    softText: "text-violet-700",
    border: "border-violet-100",
    bar: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    icon: "text-violet-600",
    shadow: "hover:shadow-violet-200/70",
  },
  green: {
    gradient: "from-emerald-500 to-teal-400",
    soft: "bg-emerald-50",
    softText: "text-emerald-700",
    border: "border-emerald-100",
    bar: "bg-gradient-to-r from-emerald-500 to-teal-400",
    icon: "text-emerald-600",
    shadow: "hover:shadow-emerald-200/70",
  },
} as const;

type AccentKey = keyof typeof ACCENTS;

interface Week {
  week: string;
  title: string;
  points: string[];
}

interface MonthData {
  id: string;
  month: string;
  title: string;
  weeks: string;
  progress: number;
  accent: AccentKey;
  icon: IconType;
  summary: string;
  focus: string[];
  weekly: Week[];
}

const MONTHS: MonthData[] = [
  {
    id: "month-1",
    month: "Month 1",
    title: "Technical Foundation",
    weeks: "Weeks 1–4",
    progress: 33,
    accent: "blue",
    icon: Code2,
    summary:
      "Rebuild the primitives so every later design decision rests on understanding, not guesswork.",
    focus: [
      "System design fundamentals",
      "Cloud platforms crash course",
      "Advanced API design",
      "Database architecture",
    ],
    weekly: [
      {
        week: "Week 1",
        title: "System Design Fundamentals",
        points: [
          "Scaling, caching, load balancing, CAP",
          "Back-of-envelope estimation practice",
        ],
      },
      {
        week: "Week 2",
        title: "Cloud Crash Course",
        points: [
          "Compute, storage, networking, IAM on AWS or Azure",
          "Deploy one real service end-to-end",
        ],
      },
      {
        week: "Week 3",
        title: "Advanced API Design",
        points: [
          "Contracts, versioning, pagination, idempotency",
          "OAuth2 / OIDC and OpenAPI-first design",
        ],
      },
      {
        week: "Week 4",
        title: "Database Architecture",
        points: [
          "Modeling, indexing, transactions, replication",
          "SQL vs NoSQL and caching layers",
        ],
      },
    ],
  },
  {
    id: "month-2",
    month: "Month 2",
    title: "Architecture Patterns",
    weeks: "Weeks 5–8",
    progress: 67,
    accent: "purple",
    icon: Layers,
    summary:
      "Learn how systems are shaped — and, more importantly, when not to apply a pattern.",
    focus: [
      "Microservices implementation",
      "Event-driven architecture",
      "Scalability & performance",
      "Security patterns",
    ],
    weekly: [
      {
        week: "Week 5",
        title: "Microservices Implementation",
        points: [
          "Real service boundaries and decomposition",
          "API gateway, and when a modular monolith wins",
        ],
      },
      {
        week: "Week 6",
        title: "Event-Driven Architecture",
        points: [
          "Queues vs logs, pub/sub, outbox, sagas",
          "Designing for eventual consistency",
        ],
      },
      {
        week: "Week 7",
        title: "Scalability & Performance",
        points: [
          "Latency budgets, CDN, caching strategy",
          "Load testing and observability",
        ],
      },
      {
        week: "Week 8",
        title: "Security Patterns",
        points: [
          "Threat modeling and least privilege",
          "Secrets management and OWASP Top 10",
        ],
      },
    ],
  },
  {
    id: "month-3",
    month: "Month 3",
    title: "Leadership & Real-World",
    weeks: "Weeks 9–12",
    progress: 100,
    accent: "green",
    icon: Users,
    summary:
      "Turn knowledge into influence: communicate, lead a real project, document decisions, certify.",
    focus: [
      "Communication & stakeholder management",
      "Lead a real project",
      "Documentation & decision records",
      "Certification prep",
    ],
    weekly: [
      {
        week: "Week 9",
        title: "Communication & Stakeholders",
        points: [
          "Layer messages for engineers, managers, executives",
          "Framing trade-offs and running design reviews",
        ],
      },
      {
        week: "Week 10",
        title: "Lead a Real Project",
        points: [
          "Own an architecture proposal, migration, or redesign",
          "Drive decisions and delivery, not just diagrams",
        ],
      },
      {
        week: "Week 11",
        title: "Documentation & ADRs",
        points: [
          "Architecture Decision Records and C4 diagrams",
          "Runbooks and onboarding documentation",
        ],
      },
      {
        week: "Week 12",
        title: "Certification Prep",
        points: [
          "AWS SAA-C03, Azure AZ-305, or CKA study plan",
          "Mock exams and a portfolio write-up",
        ],
      },
    ],
  },
];

export default function RoadmapTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="not-prose my-12">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-600 ring-1 ring-gray-200">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" />
          12-week intensive roadmap
        </span>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          From Developer to Architect in 3 Months
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
          Three focused sprints. Hover a month to preview it — tap{" "}
          <span className="font-medium text-gray-700">View weekly breakdown</span> to
          expand the plan.
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-[3.25rem] hidden h-0.5 bg-gradient-to-r from-blue-300 via-violet-300 to-emerald-300 md:block" />
        <ArrowRight className="pointer-events-none absolute left-1/3 top-[3.25rem] hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-violet-400 md:block" />
        <ArrowRight className="pointer-events-none absolute left-2/3 top-[3.25rem] hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-emerald-400 md:block" />

        <div className="grid items-start gap-6 md:grid-cols-3">
          {MONTHS.map((month, index) => {
            const accent = ACCENTS[month.accent];
            const Icon = month.icon;
            const isOpen = openId === month.id;

            return (
              <div
                key={month.id}
                className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${accent.border} ${accent.shadow} ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${visible ? index * 120 : 0}ms` }}
              >
                <div
                  className={`relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} text-white shadow-lg`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${accent.icon}`}
                  >
                    {month.month}
                  </span>
                  <span
                    className={`rounded-full ${accent.soft} ${accent.softText} px-2.5 py-0.5 text-xs font-semibold`}
                  >
                    {month.weeks}
                  </span>
                </div>

                <h4 className="mt-1 text-lg font-bold text-gray-900">{month.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {month.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {month.focus.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${accent.icon}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-400">
                    <span>Progress</span>
                    <span>{month.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${accent.bar} transition-all duration-1000 ease-out`}
                      style={{
                        width: visible ? `${month.progress}%` : "0%",
                        transitionDelay: `${visible ? index * 120 + 150 : 0}ms`,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : month.id)}
                  aria-expanded={isOpen}
                  className="pt-5"
                >
                  <span
                    className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${accent.soft} ${accent.softText} ${accent.border} hover:brightness-95`}
                  >
                    {isOpen ? "Hide weekly breakdown" : "View weekly breakdown"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ol className="space-y-3 border-t border-dashed border-gray-200 pt-4">
                      {month.weekly.map((week) => (
                        <li key={week.week} className="rounded-xl bg-gray-50 p-3">
                          <p
                            className={`text-xs font-bold uppercase tracking-wide ${accent.icon}`}
                          >
                            {week.week} · {week.title}
                          </p>
                          <ul className="mt-1.5 space-y-1">
                            {week.points.map((point) => (
                              <li
                                key={point}
                                className="flex items-start gap-1.5 text-xs text-gray-600"
                              >
                                <span
                                  className={`mt-1 h-1 w-1 flex-shrink-0 rounded-full ${accent.bar}`}
                                />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500">
        {[
          { icon: Code2, label: "Foundation", color: "text-blue-600" },
          { icon: ShieldCheck, label: "Patterns", color: "text-violet-600" },
          { icon: Award, label: "Leadership", color: "text-emerald-600" },
          { icon: Cloud, label: "Cloud-ready", color: "text-cyan-600" },
          { icon: Gauge, label: "Performance", color: "text-amber-600" },
          { icon: Database, label: "Data", color: "text-indigo-600" },
          { icon: Lock, label: "Security", color: "text-rose-600" },
          { icon: Network, label: "Distributed", color: "text-sky-600" },
          { icon: MessagesSquare, label: "Communication", color: "text-teal-600" },
          { icon: FileText, label: "Documentation", color: "text-slate-600" },
        ].map(({ icon: LegendIcon, label, color }) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <LegendIcon className={`h-3.5 w-3.5 ${color}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}