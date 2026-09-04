import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { LayoutShell } from "@/components/LayoutShell";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  // ADD THIS BLOCK:
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: ["/icon.png"],
  },
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
    siteName: "Afikri",
    title: "Afikri",
    description:
      "Developer building clean, fast web experiences. TypeScript, React, and intentional design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afikri",
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
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-black antialiased">
        <LayoutShell>
          {children}
          <Analytics />
        </LayoutShell>
      </body>
    </html>
  );
}
