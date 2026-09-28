"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const navLinkClassName =
  "inline-block text-sm font-bold uppercase tracking-tight text-neutral-500 transition-all duration-200 ease-in-out hover:text-black hover:underline hover:decoration-[#1d9bf0] hover:underline-offset-4";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative w-full border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Afikri logo"
            width={25}
            height={8}
            priority
          />
        </Link>
        <nav aria-label="Main navigation">
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClassName}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-black transition-colors hover:bg-neutral-100 md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full flex-col gap-4 border-b border-neutral-200 bg-white px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-medium text-neutral-600 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}