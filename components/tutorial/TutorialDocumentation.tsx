"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  FileText,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Info,
  ArrowRight,
} from "lucide-react";
import type { Tutorial, TutorialNavItem, SectionContent } from "@/data/tutorials";

interface TutorialDocumentationProps {
  tutorial: Tutorial;
}

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 p-6">
    <div className="flex items-start gap-3">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
      <div className="text-sm leading-relaxed text-blue-900">{children}</div>
    </div>
  </div>
);

const CodeBlock = ({ language, code }: { language: string; code: string }) => (
  <div className="my-4 overflow-hidden rounded-lg border border-gray-200">
    <div className="bg-gray-800 px-4 py-2 font-mono text-xs text-gray-400">
      {language}
    </div>
    <pre className="overflow-x-auto bg-gray-900 p-4 font-mono text-sm leading-relaxed text-gray-100">
      <code>{code}</code>
    </pre>
  </div>
);

const ChecklistItem = ({ label }: { label: string }) => (
  <label className="group flex cursor-pointer items-center gap-3 py-2">
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-gray-700 transition-colors group-hover:text-black">
      {label}
    </span>
  </label>
);

export default function TutorialDocumentation({
  tutorial,
}: TutorialDocumentationProps) {
  // Flatten navigation to find all section IDs in order
  const allSectionIds: { id: string; title: string }[] = [];
  const collectSections = (items: TutorialNavItem[]) => {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        collectSections(item.children);
      } else {
        allSectionIds.push({ id: item.id, title: item.title });
      }
    }
  };
  collectSections(tutorial.navigation);

  const initialSectionId = allSectionIds[0]?.id ?? "learning-outcomes";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set([tutorial.navigation[0]?.id ?? ""])
  );
  const [activeSection, setActiveSection] = useState(initialSectionId);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleNavClick = (itemId: string) => {
    setActiveSection(itemId);
    setSidebarOpen(false);
  };

  const currentSectionIndex = allSectionIds.findIndex(
    (s) => s.id === activeSection
  );
  const prevSection =
    currentSectionIndex > 0 ? allSectionIds[currentSectionIndex - 1] : null;
  const nextSection =
    currentSectionIndex < allSectionIds.length - 1
      ? allSectionIds[currentSectionIndex + 1]
      : null;

  const sectionData: SectionContent | undefined =
    tutorial.sections[activeSection] ??
    tutorial.sections[initialSectionId];

  const renderNavItem = (item: TutorialNavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(item.id);
    const isActive = activeSection === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() =>
            hasChildren ? toggleSection(item.id) : handleNavClick(item.id)
          }
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
            isActive
              ? "bg-blue-100 font-medium text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          } ${level > 0 ? "ml-4" : ""}`}
        >
          <span className="flex items-center text-left">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="mr-2 h-4 w-4 shrink-0" />
              ) : (
                <ChevronRight className="mr-2 h-4 w-4 shrink-0" />
              )
            ) : (
              <FileText className="mr-2 h-4 w-4 shrink-0" />
            )}
            <span className="truncate">{item.title}</span>
          </span>
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const filteredNavigation = tutorial.navigation.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.children?.some((child) =>
        child.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:transition-none`}
      >
        {/* Header / Back to Tutorials */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div className="flex items-center space-x-2">
            <Link
              href="/tutorial"
              className="rounded-lg p-2 transition-colors hover:bg-gray-100"
              aria-label="Back to Tutorials"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Tutorial
              </span>
              <span className="text-lg font-bold text-black line-clamp-1">
                {tutorial.title}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm text-black placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {filteredNavigation.map((item) => renderNavItem(item))}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1">
        <main className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
          {/* Mobile Menu Toggle Button */}
          <div className="mb-6 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
              <span>Menu</span>
            </button>
          </div>

          <div className="prose prose-lg max-w-none">
            {sectionData ? (
              <div className="space-y-6">
                {/* Section Header */}
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                    <Link
                      href="/tutorial"
                      className="text-blue-600 hover:underline"
                    >
                      Tutorials
                    </Link>
                    <span>/</span>
                    <span>{tutorial.title}</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-black">
                    {sectionData.title}
                    {sectionData.timing && (
                      <span className="ml-3 text-base font-normal text-gray-400">
                        ({sectionData.timing})
                      </span>
                    )}
                  </h1>
                </div>

                {sectionData.description && (
                  <p className="text-lg leading-relaxed text-gray-600">
                    {sectionData.description}
                  </p>
                )}

                {/* Subsections */}
                {sectionData.subsections?.map((sub, idx) => (
                  <div key={idx} className="space-y-4 pt-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-black">
                      {sub.heading}
                    </h2>

                    {sub.body && (
                      <p className="leading-relaxed text-gray-600">
                        {sub.body}
                      </p>
                    )}

                    {sub.table && (
                      <div className="my-4 overflow-x-auto">
                        <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {sub.table.headers.map((h) => (
                                <th
                                  key={h}
                                  className="border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {sub.table.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-4 py-3 text-sm text-gray-700 ${
                                      cIdx === 0 ? "font-medium" : ""
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {sub.points && (
                      <ul className="ml-4 space-y-2 text-gray-700">
                        {sub.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="mt-1 text-blue-600">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sub.code && (
                      <CodeBlock
                        language={sub.code.language}
                        code={sub.code.code}
                      />
                    )}

                    {sub.info && <InfoBox>{sub.info}</InfoBox>}
                  </div>
                ))}

                {/* Checklist Section */}
                {sectionData.checklist && (
                  <div className="space-y-4 pt-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-black">
                      Session Checklist
                    </h2>
                    <div className="space-y-1 divide-y divide-gray-100">
                      {sectionData.checklist.map((item, cIdx) => (
                        <ChecklistItem key={cIdx} label={item} />
                      ))}
                    </div>
                  </div>
                )}

                {sectionData.infoBox && (
                  <InfoBox>{sectionData.infoBox}</InfoBox>
                )}

                {/* Prev / Next Section Navigation */}
                <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  {prevSection ? (
                    <button
                      onClick={() => handleNavClick(prevSection.id)}
                      className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      <span>{prevSection.title}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextSection && (
                    <button
                      onClick={() => handleNavClick(nextSection.id)}
                      className="group flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <span>{nextSection.title}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-black capitalize">
                  {activeSection.replace(/-/g, " ")}
                </h1>
                <p className="text-lg leading-relaxed text-gray-600">
                  Content for this section is coming soon.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
