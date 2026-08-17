"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/phrases", label: "Phrases" },
  { href: "/quiz", label: "Quiz" },
  { href: "/lessons", label: "Lessons" },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <nav style={{ background: "var(--navy)", borderBottom: "3px solid var(--gold)" }}>
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <span style={{ fontFamily: "Amiri, serif", fontSize: 24, color: "var(--gold-light)", direction: "rtl" }}>فلاحي</span>
          <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Falahi Arabic</span>
        </Link>
        <div className="flex gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: "6px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: path === l.href ? "var(--navy)" : "rgba(255,255,255,0.8)",
              background: path === l.href ? "var(--gold)" : "transparent",
              transition: "all 0.15s",
            }}>{l.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
