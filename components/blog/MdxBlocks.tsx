import type { ReactNode } from "react";
import { AlertTriangle, Clock, Lightbulb, Rocket, Star } from "lucide-react";

const CALLOUT_STYLES = {
  note: {
    container: "border-blue-300 bg-blue-50",
    label: "text-blue-800",
    icon: <Lightbulb className="h-5 w-5" />,
    defaultTitle: "Note",
  },
  tip: {
    container: "border-green-300 bg-green-50",
    label: "text-green-800",
    icon: <Rocket className="h-5 w-5" />,
    defaultTitle: "Tip",
  },
  warning: {
    container: "border-amber-300 bg-amber-50",
    label: "text-amber-800",
    icon: <AlertTriangle className="h-5 w-5" />,
    defaultTitle: "Watch out",
  },
  important: {
    container: "border-purple-300 bg-purple-50",
    label: "text-purple-800",
    icon: <Star className="h-5 w-5" />,
    defaultTitle: "Important",
  },
} as const;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof CALLOUT_STYLES;
  title?: string;
  children: ReactNode;
}) {
  const style = CALLOUT_STYLES[type];
  return (
    <div
      className={`my-6 rounded-lg border-l-4 border-t border-r border-b p-5 ${style.container}`}
    >
      <p className={`mb-2 flex items-center gap-2 font-semibold ${style.label}`}>
        {style.icon}
        {title ?? style.defaultTitle}
      </p>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}

export function SkillBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700">
      {children}
    </span>
  );
}

export function PhaseCard({
  number,
  title,
  duration,
  children,
}: {
  number: string;
  title: string;
  duration: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            {number}
          </span>
          <h3 className="text-lg font-semibold text-black">{title}</h3>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          <Clock className="h-4 w-4" />
          {duration}
        </span>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}