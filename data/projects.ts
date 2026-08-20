export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  role: string;
  year: string;
  link?: string;
}

export const projects: Project[] = [
  {
    slug: "afikri-online",
    title: "afikri.online",
    description:
      "Personal portfolio site. Minimalist by design, built with Next.js and Tailwind with strict attention to typography and whitespace.",
    longDescription:
      "This very site. A minimalist portfolio built from scratch with a focus on clean typography, generous whitespace, and fast load times. Every design decision — from the Montserrat typeface to the black-and-white palette with blue accents — was made intentionally. The site uses Next.js App Router, TypeScript for type safety, and Tailwind CSS for styling. Static generation ensures instant page loads and excellent SEO performance.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown"],
    role: "Full Stack Developer",
    year: "2025",
    link: "https://afikri.online",
  },
  {
    slug: "early-warning-system",
    title: "Multi-Hazard Early Warning System",
    description:
      "Backend architecture for BNPB's national disaster resilience platform, connecting field data collection with central information systems.",
    longDescription:
      "Designed and developed backend services for Indonesia's national multi-hazard early warning system under BNPB (Badan Nasional Penanggulangan Bencana). The platform processes real-time disaster data from seismic sensors, weather stations, and field reporters, distributing alerts across multiple channels. Built scalable APIs and integration layers that connect field data collection tools with central information systems, enabling faster response times for natural disaster management across the Indonesian archipelago.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs"],
    role: "Software Engineering Specialist",
    year: "2023 – 2024",
  },
  {
    slug: "maritime-heritage-database",
    title: "Maritime Asian Heritage Survey Database",
    description:
      "Database architecture and backend services for Kyoto University's maritime heritage documentation and research platform.",
    longDescription:
      "Served as Database Officer for the Maritime Asian Heritage Survey, a research initiative under Kyoto University. Designed and managed PostgreSQL databases for maritime heritage documentation and archival workflows. Built backend services and data pipelines for processing research data, enabling interoperability between different archaeological datasets. Developed ETL procedures for harmonizing heritage records across multiple source formats and regional datasets, supporting cross-institutional research collaboration.",
    technologies: ["PostgreSQL", "Python", "ETL", "Data Pipelines", "REST APIs"],
    role: "Database Officer",
    year: "2024 – 2026",
  },
  {
    slug: "unicef-monitoring-dashboards",
    title: "UNICEF Monitoring Dashboards",
    description:
      "Full stack development for national reporting systems supporting child welfare and program delivery across Indonesia.",
    longDescription:
      "Developed and maintained full stack applications for UNICEF Indonesia, building monitoring dashboards and national reporting systems. Created RESTful APIs and database integrations for cross-system data exchange, enabling real-time visibility into child welfare programs. Built interactive dashboards that helped program officers track key indicators across education, health, and protection sectors. The systems supported data-driven decision making for UNICEF's country office operations.",
    technologies: ["React", "Node.js", "PostgreSQL", "REST APIs", "Docker"],
    role: "Full Stack Programmer",
    year: "2021",
  },
  {
    slug: "health-programme-platform",
    title: "Health Programme Monitoring Platform",
    description:
      "Backend systems for NGO health programme reporting, enabling field-level data collection and centralized analytics.",
    longDescription:
      "Built backend infrastructure for a health programme monitoring platform used by an international NGO. The system enabled field workers to submit programme data through mobile interfaces, which was then processed and aggregated for centralized reporting. Designed database schemas optimized for health indicator tracking, built API layers for data ingestion, and created automated reporting pipelines that reduced manual compilation time from days to hours.",
    technologies: ["Python", "Django", "PostgreSQL", "REST APIs", "Redis"],
    role: "Backend Developer",
    year: "2020 – 2021",
  },
  {
    slug: "iom-rams-platform",
    title: "IOM RAMS Platform",
    description:
      "Database administration and data processing for IOM's Migration Information and Data Analysis System.",
    longDescription:
      "Administered enterprise database systems for the International Organization for Migration's RAMS (Registration and Management System) platform. Managed PostgreSQL and SQL Server databases supporting large-scale humanitarian migration data workflows. Developed data processing pipelines and ETL procedures for migration data, ensuring data integrity across registration, tracking, and reporting modules. Built automated data quality checks and reconciliation processes for high-volume datasets.",
    technologies: ["PostgreSQL", "SQL Server", "Python", "ETL", "Linux"],
    role: "Database System Administrator",
    year: "2017 – 2018",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
