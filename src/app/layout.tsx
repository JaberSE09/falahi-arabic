import type { Metadata, Viewport } from "next";
import { Amiri, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Falahi Arabic — Learn Palestinian & Islamic Arabic",
  description: "Interactive flashcards, phrases, Quran, duas, and hadith to learn Palestinian and Quranic Arabic.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${amiri.variable}`}>
      <body style={{ minHeight: "100vh", background: "var(--cream)" }}>
        <Navbar />
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 48px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
