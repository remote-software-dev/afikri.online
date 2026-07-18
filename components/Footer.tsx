export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-8 text-sm text-gray-500 sm:flex-row sm:justify-between">
        <span>&copy; {new Date().getFullYear()} afikri</span>
        <ul className="flex gap-6" aria-label="Social links">
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-600"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-600"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
