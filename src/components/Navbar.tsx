"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sections = [
  {
    label: "🇵🇸 Palestinian Arabic",
    color: "#1A2744",
    links: [
      { href: "/flashcards", label: "Flashcards" },
      { href: "/phrases",    label: "Phrases" },
      { href: "/quiz",       label: "Quiz" },
      { href: "/lessons",    label: "Lessons" },
    ],
  },
  {
    label: "☪️ Islamic Arabic",
    color: "#2D5A27",
    links: [
      { href: "/quran",  label: "Quran" },
      { href: "/dua",    label: "Duas" },
      { href: "/hadith", label: "Hadith" },
    ],
  },
];

export default function Navbar() {
  const path = usePathname();
  const islamicPaths = ["/quran", "/dua", "/hadith"];
  const activeSection = islamicPaths.some(p => path.startsWith(p)) ? 1 : 0;

  return (
    <nav>
      {/* Top bar */}
      <div style={{ background: "#0d1529", borderBottom: "1px solid #1e2d4a", padding: "0 16px" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between h-14">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span className="arabic" style={{ fontSize: 22, color: "var(--gold-light)" }}>فلاحي</span>
            <span style={{ color: "white", fontWeight: 700, fontSize: 17 }}>Falahi Arabic</span>
          </Link>
          <Link href="/" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ background: "var(--navy)", borderBottom: "3px solid var(--gold)" }}>
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-0 h-12">
          {sections.map((sec, si) => (
            <div key={si} style={{ display: "flex", alignItems: "center", height: "100%", marginRight: 8 }}>
              {/* Section label */}
              <span style={{
                fontSize: 12, fontWeight: 700, color: activeSection===si ? "var(--gold)" : "rgba(255,255,255,0.45)",
                marginRight: 14, letterSpacing: 0.5, whiteSpace: "nowrap",
              }}>{sec.label}</span>
              {/* Links */}
              {sec.links.map(l => {
                const active = path === l.href;
                return (
                  <Link key={l.href} href={l.href} style={{
                    padding: "0 14px", height: "100%", display: "flex", alignItems: "center",
                    fontSize: 13, fontWeight: 600, textDecoration: "none",
                    color: active ? "var(--navy)" : "rgba(255,255,255,0.75)",
                    background: active ? "var(--gold)" : "transparent",
                    borderRadius: active ? "6px 6px 0 0" : 0,
                    transition: "all 0.15s",
                  }}>{l.label}</Link>
                );
              })}
              {si < sections.length - 1 && (
                <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.15)", marginLeft: 8 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
