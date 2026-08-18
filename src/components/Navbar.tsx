"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sections = [
  {
    label: "🇵🇸 Palestinian",
    links: [
      { href: "/flashcards", label: "Flashcards", icon: "🃏" },
      { href: "/phrases",    label: "Phrases",    icon: "💬" },
      { href: "/quiz",       label: "Quiz",       icon: "🎯" },
      { href: "/lessons",    label: "Lessons",    icon: "📖" },
    ],
  },
  {
    label: "☪️ Islamic",
    links: [
      { href: "/quran",  label: "Quran",  icon: "📖" },
      { href: "/dua",    label: "Duas",   icon: "🤲" },
      { href: "/hadith", label: "Hadith", icon: "📿" },
    ],
  },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "var(--navy)", borderBottom: "3px solid var(--gold)" }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          {/* Logo */}
          <Link href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span className="arabic" style={{ fontSize: 22, color: "var(--gold-light)" }}>فلاحي</span>
            <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>Falahi Arabic</span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden-mobile">
            {sections.map((sec, si) => (
              <div key={si} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginRight: 8, marginLeft: si > 0 ? 12 : 0 }}>{sec.label}</span>
                {sec.links.map(l => (
                  <Link key={l.href} href={l.href} style={{
                    padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    color: path === l.href ? "var(--navy)" : "rgba(255,255,255,0.8)",
                    background: path === l.href ? "var(--gold)" : "transparent",
                    textDecoration: "none", transition: "all 0.15s",
                  }}>{l.label}</Link>
                ))}
              </div>
            ))}
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} className="show-mobile" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "white" }} aria-label="Menu">
            {open ? (
              <svg width={24} height={24} viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            ) : (
              <svg width={24} height={24} viewBox="0 0 24 24" fill="white"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="show-mobile" style={{ paddingBottom: 16 }}>
            {sections.map((sec, si) => (
              <div key={si} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: 1, marginBottom: 6, paddingTop: si > 0 ? 10 : 0, borderTop: si > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>{sec.label}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {sec.links.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                      background: path === l.href ? "var(--gold)" : "rgba(255,255,255,0.08)",
                      color: path === l.href ? "var(--navy)" : "white",
                      fontWeight: 600, fontSize: 14,
                    }}>
                      <span>{l.icon}</span>{l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
