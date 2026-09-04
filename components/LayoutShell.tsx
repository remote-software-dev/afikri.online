'use client'

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
