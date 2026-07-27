import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full border-b border-black-200">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-black"
        >
          afikri
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-3 text-sm sm:flex-row sm:gap-6">
            <li>
              <Link
                href="/"
                className="text-black-500 transition-colors hover:text-blue-600"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/blogs"
                className="text-black-500 transition-colors hover:text-blue-600"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-black-500 transition-colors hover:text-blue-600"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-black-500 transition-colors hover:text-blue-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-black-500 transition-colors hover:text-blue-600"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
