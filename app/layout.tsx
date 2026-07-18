import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://afikri.online";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "afikri",
    template: "%s | afikri",
  },
  description:
    "Developer building clean, fast web experiences. TypeScript, React, and intentional design.",
  keywords: ["afikri", "developer", "portfolio", "TypeScript", "React"],
  authors: [{ name: "afikri" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "afikri",
    title: "afikri",
    description:
      "Developer building clean, fast web experiences. TypeScript, React, and intentional design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "afikri",
    description:
      "Developer building clean, fast web experiences. TypeScript, React, and intentional design.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-black antialiased">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
