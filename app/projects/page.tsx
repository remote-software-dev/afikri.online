"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import Pagination from "@/components/blog/Pagination";

export interface Project {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postsPerPage = 4;
  const totalPages = Math.ceil(projects.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const projectsToShow = projects.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <section className="mb-12">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-black md:text-5xl">
          Projects
        </h1>
      </section>

      <div className="border-b border-gray-100 my-12" />

      <section>
        <div className="flex flex-col gap-8">
          {projectsToShow.length > 0 ? (
            projectsToShow.map((project) => (
              <ProjectCard
                key={project.slug}
                tags={project.tags}
                title={project.title}
                author={project.author}
                date={project.date}
                content={project.excerpt}
                readMoreLink={`/projects/${project.slug}`}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No projects found.</p>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
}
