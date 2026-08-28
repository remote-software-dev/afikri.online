import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
        Project Not Found
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        The project you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/projects"
        className="inline-flex items-center bg-black px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
      >
        &larr; Back to Projects
      </Link>
    </div>
  );
}
