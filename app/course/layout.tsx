import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artificial Intelligence",
  description: "Comprehensive documentation and tutorials",
};

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
