import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Falahi Arabic — Learn Iraqi/Gulf Arabic",
  description: "Interactive flashcards, phrases, and lessons to learn Falahi (Iraqi/Gulf) Arabic dialect.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: "var(--cream)" }}>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
