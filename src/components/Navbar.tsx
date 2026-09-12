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

const tutoringLinks = [
  { href: "/tutoring",                        label: "All Lessons",     icon: "🎓" },
  { href: "/tutoring/lesson?id=days",         label: "Days of Week",    icon: "📅" },
  { href: "/tutoring/lesson?id=wh-questions", label: "WH-Questions",    icon: "❓" },
  { href: "/tutoring/lesson?id=connectors",   label: "Connectors",      icon: "🔗" },
  { href: "/tutoring/lesson?id=time-range-1", label: "Time — Past Hour",icon: "⏰" },
  { href: "/tutoring/lesson?id=time-range-2", label: "Time — To Hour",  icon: "⏱️" },
  { href: "/tutoring/lesson?id=plurals",      label: "Plural Forms",    icon: "🔢" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [tutoringOpen, setTutoringOpen] = useState(false);

  const isTutoring = path.startsWith("/tutoring");

  return (
    <nav style={{ background: "var(--navy)", borderBottom: "3px solid var(--gold)", position: "relative", zIndex: 100 }}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          {/* Logo */}
          <Link href="/" onClick={() => { setOpen(false); setTutoringOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span className="arabic" style={{ fontSize: 22, color: "var(--gold-light)" }}>فلاحي</span>
            <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>Falahi Arabic</span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="hidden-mobile">
            {sections.map((sec, si) => (
              <div key={si} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginRight: 8, marginLeft: si > 0 ? 12 : 0 }}>{sec.label}</span>
                {sec.links.map(l => (
                  <Link key={l.href} href={l.href} style={{
                    padding: "6px 12px", borderRadius: 8, fontSize: 15, fontWeight: 700,
                    color: path === l.href ? "var(--navy)" : "rgba(255,255,255,0.8)",
                    background: path === l.href ? "var(--gold)" : "transparent",
                    textDecoration: "none", transition: "all 0.15s",
                  }}>{l.label}</Link>
                ))}
              </div>
            ))}

            {/* Tutoring dropdown */}
            <div style={{ position: "relative", marginLeft: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginRight: 8 }}>🎓 Tutoring</span>
              <button
                onClick={() => setTutoringOpen(o => !o)}
                style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: 15, fontWeight: 700,
                  color: isTutoring ? "var(--navy)" : "rgba(255,255,255,0.9)",
                  background: isTutoring ? "#2563EB" : tutoringOpen ? "rgba(255,255,255,0.15)" : "transparent",
                  border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
                  transition: "all 0.15s",
                }}
              >
                Study Sheets
                <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" style={{ transform: tutoringOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>

              {/* Dropdown panel */}
              {tutoringOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", right: 0,
                  background: "white", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  border: "2px solid #e8e0d0", minWidth: 220, overflow: "hidden", zIndex: 200,
                }}>
                  <div style={{ padding: "8px 14px 6px", background: "#2563EB", color: "white", fontSize: 12, fontWeight: 800, letterSpacing: 0.5 }}>
                    🎓 YOUR STUDY SHEETS
                  </div>
                  {tutoringLinks.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setTutoringOpen(false)} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "11px 16px", textDecoration: "none",
                      color: path === l.href ? "#2563EB" : "#222",
                      background: path === l.href ? "#EFF6FF" : "white",
                      fontWeight: path === l.href ? 800 : 600, fontSize: 15,
                      borderBottom: "1px solid #f0ece4", transition: "background 0.1s",
                    }}
                      onMouseEnter={e => { if (path !== l.href) (e.currentTarget as HTMLElement).style.background = "#f8f8f8"; }}
                      onMouseLeave={e => { if (path !== l.href) (e.currentTarget as HTMLElement).style.background = "white"; }}
                    >
                      <span style={{ fontSize: 18 }}>{l.icon}</span>
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger */}
          <button onClick={() => { setOpen(o => !o); setTutoringOpen(false); }} className="show-mobile" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "white" }} aria-label="Menu">
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

            {/* Tutoring section in mobile drawer */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: 1, marginBottom: 6 }}>🎓 TUTORING — STUDY SHEETS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {tutoringLinks.map(l => (
                  <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 14px", borderRadius: 10, textDecoration: "none",
                    background: path === l.href ? "#2563EB" : "rgba(37,99,235,0.2)",
                    color: "white", fontWeight: 600, fontSize: 14,
                  }}>
                    <span>{l.icon}</span>{l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {tutoringOpen && (
        <div onClick={() => setTutoringOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
      )}
    </nav>
  );
}
