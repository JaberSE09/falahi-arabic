"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sections = [
  {
    label: "🇵🇸 Palestinian",
    color: "var(--gold)",
    links: [
      { href: "/flashcards", label: "Flashcards", icon: "🃏" },
      { href: "/phrases",    label: "Phrases",    icon: "💬" },
      { href: "/quiz",       label: "Quiz",       icon: "🎯" },
      { href: "/lessons",    label: "Lessons",    icon: "📖" },
    ],
  },
  {
    label: "☪️ Islamic",
    color: "#10B981",
    links: [
      { href: "/quran",  label: "Quran",  icon: "📖" },
      { href: "/dua",    label: "Duas",   icon: "🤲" },
      { href: "/hadith", label: "Hadith", icon: "📿" },
    ],
  },
];

const tutoringLinks = [
  { href: "/tutoring",                        label: "All Lessons",   icon: "🎓" },
  { href: "/tutoring/lesson?id=days",         label: "Days",          icon: "📅" },
  { href: "/tutoring/lesson?id=wh-questions", label: "Questions",     icon: "❓" },
  { href: "/tutoring/lesson?id=connectors",   label: "Connectors",    icon: "🔗" },
  { href: "/tutoring/lesson?id=time-range-1", label: "Time (Past)",   icon: "⏰" },
  { href: "/tutoring/lesson?id=time-range-2", label: "Time (To)",     icon: "⏱️" },
  { href: "/tutoring/lesson?id=plurals",      label: "Plurals",       icon: "🔢" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [tutoringOpen, setTutoringOpen] = useState(false);
  const isTutoring = path.startsWith("/tutoring");

  const close = () => { setOpen(false); setTutoringOpen(false); };

  return (
    <>
      <nav style={{ background: "var(--navy)", borderBottom: "3px solid var(--gold)", position: "sticky", top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>

          {/* ── Top bar ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>

            {/* Logo */}
            <Link href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
              <span className="arabic" style={{ fontSize: 24, color: "var(--gold-light)", lineHeight: 1 }}>فلاحي</span>
              <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>Falahi</span>
            </Link>

            {/* Desktop links */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
              {sections.map((sec, si) => (
                <div key={si} style={{ display: "flex", alignItems: "center" }}>
                  {si > 0 && <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", margin: "0 10px" }} />}
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", marginRight: 6 }}>{sec.label}</span>
                  {sec.links.map(l => (
                    <Link key={l.href} href={l.href} style={{
                      padding: "5px 10px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                      color: path === l.href ? "var(--navy)" : "rgba(255,255,255,0.8)",
                      background: path === l.href ? "var(--gold)" : "transparent",
                      textDecoration: "none", transition: "background 0.15s, color 0.15s",
                      whiteSpace: "nowrap",
                    }}>{l.label}</Link>
                  ))}
                </div>
              ))}

              {/* Tutoring dropdown */}
              <div style={{ position: "relative", marginLeft: 10 }}>
                <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)", display: "inline-block", marginRight: 10, verticalAlign: "middle" }} />
                <button onClick={() => setTutoringOpen(o => !o)} style={{
                  padding: "5px 12px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                  color: isTutoring ? "var(--navy)" : "rgba(255,255,255,0.9)",
                  background: isTutoring ? "#2563EB" : tutoringOpen ? "rgba(255,255,255,0.12)" : "transparent",
                  border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5,
                  whiteSpace: "nowrap", transition: "all 0.15s",
                }}>
                  🎓 Study Sheets
                  <svg width={11} height={11} viewBox="0 0 24 24" fill="currentColor" style={{ transform: tutoringOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", opacity: 0.7 }}>
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                {tutoringOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 300,
                    background: "white", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                    border: "2px solid #e8e0d0", minWidth: 200, overflow: "hidden",
                  }}>
                    <div style={{ padding: "8px 14px 6px", background: "#2563EB", color: "white", fontSize: 11, fontWeight: 800, letterSpacing: 0.8 }}>
                      🎓 STUDY SHEETS
                    </div>
                    {tutoringLinks.map(l => (
                      <Link key={l.href} href={l.href} onClick={() => setTutoringOpen(false)} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                        textDecoration: "none", fontSize: 14, fontWeight: path === l.href ? 800 : 600,
                        color: path === l.href ? "#2563EB" : "#222",
                        background: path === l.href ? "#EFF6FF" : "transparent",
                        borderBottom: "1px solid #f0ece4",
                      }}>
                        <span>{l.icon}</span>{l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => { setOpen(o => !o); setTutoringOpen(false); }}
              className="show-mobile"
              aria-label="Menu"
              style={{
                background: open ? "rgba(255,255,255,0.12)" : "none",
                border: "none", cursor: "pointer", padding: "10px 12px",
                borderRadius: 10, color: "white", WebkitTapHighlightColor: "transparent",
              }}
            >
              {open
                ? <svg width={22} height={22} viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                : <svg width={22} height={22} viewBox="0 0 24 24" fill="white"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer — full screen overlay ── */}
      {open && (
        <div
          className="show-mobile"
          style={{
            position: "fixed", inset: 0, zIndex: 190,
            background: "rgba(0,0,0,0.5)", overflowY: "auto",
          }}
          onClick={close}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "var(--navy)", minHeight: "100dvh",
              width: "min(320px, 90vw)", padding: "0 0 40px",
              boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
            }}
          >
            {/* Drawer header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <Link href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                <span className="arabic" style={{ fontSize: 22, color: "var(--gold-light)" }}>فلاحي</span>
                <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>Falahi Arabic</span>
              </Link>
              <button onClick={close} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, WebkitTapHighlightColor: "transparent" }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>

            <div style={{ padding: "16px 16px 0" }}>
              {/* Palestinian + Islamic sections */}
              {sections.map((sec, si) => (
                <div key={si} style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
                    color: "rgba(255,255,255,0.45)", marginBottom: 8,
                    paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    {sec.label}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {sec.links.map(l => (
                      <Link key={l.href} href={l.href} onClick={close} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "13px 14px", borderRadius: 12, textDecoration: "none",
                        background: path === l.href ? "var(--gold)" : "rgba(255,255,255,0.06)",
                        color: path === l.href ? "var(--navy)" : "white",
                        fontWeight: path === l.href ? 800 : 600,
                        fontSize: 15, transition: "background 0.15s",
                        WebkitTapHighlightColor: "transparent",
                      }}>
                        <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>{l.icon}</span>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Tutoring section */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
                  color: "rgba(255,255,255,0.45)", marginBottom: 8,
                  paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}>
                  🎓 TUTORING — STUDY SHEETS
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {tutoringLinks.map(l => (
                    <Link key={l.href} href={l.href} onClick={close} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "13px 14px", borderRadius: 12, textDecoration: "none",
                      background: path === l.href ? "#2563EB" : "rgba(37,99,235,0.15)",
                      color: "white", fontWeight: path === l.href ? 800 : 600,
                      fontSize: 15, transition: "background 0.15s",
                      WebkitTapHighlightColor: "transparent",
                    }}>
                      <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>{l.icon}</span>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click-outside to close desktop dropdown */}
      {tutoringOpen && (
        <div onClick={() => setTutoringOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />
      )}
    </>
  );
}
