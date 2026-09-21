"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  Menu,
  Search,
  X,
} from "lucide-react";
import type { MdxTocItem } from "@/lib/getMdxContent";

interface TutorialMdxDocumentationProps {
  title: string;
  description?: string;
  toc: MdxTocItem[];
  children: React.ReactNode;
}

export default function TutorialMdxDocumentation({
  title,
  description,
  toc,
  children,
}: TutorialMdxDocumentationProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");
  const contentRef = useRef<HTMLDivElement>(null);

  const tocIds = useMemo(() => {
    const ids = new Set<string>();
    const walk = (items: MdxTocItem[]) => {
      for (const item of items) {
        ids.add(item.id);
        if (item.children && item.children.length > 0) {
          walk(item.children);
        }
      }
    };
    walk(toc);
    return ids;
  }, [toc]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        const topmost = visible[0];
        if (topmost && tocIds.has(topmost.target.id)) {
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    const headings = Array.from(
      container.querySelectorAll<HTMLElement>("h1[id], h2[id]")
    );
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [tocIds]);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredToc = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return toc;

    return toc
      .map((item) => {
        const parentMatches = item.title.toLowerCase().includes(query);
        if (parentMatches) return item;

        const childMatches =
          item.children?.filter((child) =>
            child.title.toLowerCase().includes(query)
          ) ?? [];
        if (childMatches.length > 0) {
          return { ...item, children: childMatches };
        }
        return null;
      })
      .filter((item): item is MdxTocItem => item !== null);
  }, [toc, searchQuery]);

  const renderNavItem = (item: MdxTocItem, level: number = 0, index: number = 0) => (
    <div key={`${level}-${index}-${item.id}`}>
      <a
        href={`#${item.id}`}
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(item.id);
        }}
        aria-current={activeId === item.id ? "true" : undefined}
        className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
          activeId === item.id
            ? "bg-blue-100 font-medium text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        } ${level > 0 ? "ml-4" : ""}`}
      >
        {item.children && item.children.length > 0 ? (
          <ChevronRight
            className={`mr-2 h-4 w-4 shrink-0 ${
              activeId === item.id ? "text-blue-600" : "text-gray-400"
            }`}
          />
        ) : (
          <FileText className="mr-2 h-4 w-4 shrink-0" />
        )}
        <span className="truncate text-left">{item.title}</span>
      </a>
      {item.children && item.children.length > 0 && (
        <div className="mt-1 space-y-1">
          {item.children.map((child, index) =>
            renderNavItem(child, level + 1, index)
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:transition-none`}
      >
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
                {title}
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

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {filteredToc.map((item, index) => renderNavItem(item, 0, index))}
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
          <div className="mb-6 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
              <span>Menu</span>
            </button>
          </div>

          <div ref={contentRef} className="prose prose-lg max-w-none">
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                  <Link
                    href="/tutorial"
                    className="text-blue-600 hover:underline"
                  >
                    Tutorials
                  </Link>
                  <span>/</span>
                  <span>{title}</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-black">
                  {title}
                </h1>
                {description && (
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    {description}
                  </p>
                )}
              </div>

              <div className="space-y-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}