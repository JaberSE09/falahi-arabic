"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sections = [
  {
    label: "🇵🇸 Palestinian",
    color: "#B8860B",
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
  { href: "/tutoring/lesson?id=days",         label: "Days of Week",  icon: "📅" },
  { href: "/tutoring/lesson?id=wh-questions", label: "WH-Questions",  icon: "❓" },
  { href: "/tutoring/lesson?id=connectors",   label: "Connectors",    icon: "🔗" },
  { href: "/tutoring/lesson?id=time-range-1", label: "Time — Past",   icon: "⏰" },
  { href: "/tutoring/lesson?id=time-range-2", label: "Time — To",     icon: "⏱️" },
  { href: "/tutoring/lesson?id=plurals",      label: "Plural Forms",  icon: "🔢" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [tutoringOpen, setTutoringOpen] = useState(false);
  const isTutoring = path.startsWith("/tutoring");
  const close = () => { setOpen(false); setTutoringOpen(false); };

  return (
    <>
      {/* ── Nav bar ── */}
      <nav style={{
        background: "var(--navy)", borderBottom: "3px solid var(--gold)",
        position: "sticky", top: 0, zIndex: 200,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>

          {/* Logo */}
          <Link href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <span className="arabic" style={{ fontSize: 24, color: "var(--gold-light)", lineHeight: 1 }}>فلاحي</span>
            <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>Falahi Arabic</span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
            {sections.map((sec, si) => (
              <div key={si} style={{ display: "flex", alignItems: "center" }}>
                {si > 0 && <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)", margin: "0 8px" }} />}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, marginRight: 4 }}>{sec.label}</span>
                {sec.links.map(l => (
                  <Link key={l.href} href={l.href} style={{
                    padding: "5px 10px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                    color: path === l.href ? "var(--navy)" : "rgba(255,255,255,0.8)",
                    background: path === l.href ? "var(--gold)" : "transparent",
                    textDecoration: "none", whiteSpace: "nowrap", transition: "all 0.15s",
                  }}>{l.label}</Link>
                ))}
              </div>
            ))}
            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)", margin: "0 8px" }} />
            <div style={{ position: "relative" }}>
              <button onClick={() => setTutoringOpen(o => !o)} style={{
                padding: "5px 12px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                color: isTutoring ? "var(--navy)" : "rgba(255,255,255,0.9)",
                background: isTutoring ? "#2563EB" : tutoringOpen ? "rgba(255,255,255,0.12)" : "transparent",
                border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5,
                whiteSpace: "nowrap", transition: "all 0.15s",
              }}>
                🎓 Study Sheets
                <svg width={11} height={11} viewBox="0 0 24 24" fill="currentColor" style={{ transform: tutoringOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", opacity: 0.6 }}>
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              {tutoringOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 300, background: "white", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "2px solid #e8e0d0", minWidth: 200, overflow: "hidden" }}>
                  <div style={{ padding: "8px 14px 6px", background: "#2563EB", color: "white", fontSize: 11, fontWeight: 800, letterSpacing: 0.8 }}>🎓 STUDY SHEETS</div>
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

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} className="show-mobile" aria-label="Menu" style={{
            background: open ? "rgba(255,255,255,0.1)" : "none",
            border: "2px solid " + (open ? "rgba(255,255,255,0.3)" : "transparent"),
            cursor: "pointer", padding: "7px 9px", borderRadius: 10, color: "white",
            WebkitTapHighlightColor: "transparent", transition: "all 0.15s",
          }}>
            {open
              ? <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              : <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div onClick={close} className="show-mobile" style={{ position: "fixed", inset: 0, zIndex: 190, background: "rgba(0,0,0,0.55)" }} />

          {/* Panel — drops down from navbar */}
          <div className="show-mobile" style={{
            position: "fixed", top: 59, left: 0, right: 0, zIndex: 195,
            background: "var(--navy)",
            borderBottom: "3px solid var(--gold)",
            overflowY: "auto", maxHeight: "calc(100dvh - 59px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
          }}>
            <div style={{ padding: "12px 14px 28px" }}>

              {/* Palestinian + Islamic: icon grid */}
              {sections.map((sec, si) => (
                <div key={si} style={{ marginBottom: 18 }}>
                  {/* Section label */}
                  <div style={{
                    fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
                    color: "rgba(255,255,255,0.4)", marginBottom: 8,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                    {sec.label}
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                  </div>
                  {/* 2-column icon grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {sec.links.map(l => {
                      const active = path === l.href;
                      return (
                        <Link key={l.href} href={l.href} onClick={close} style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "12px 14px", borderRadius: 12, textDecoration: "none",
                          background: active ? "var(--gold)" : "rgba(255,255,255,0.07)",
                          color: active ? "var(--navy)" : "white",
                          fontWeight: active ? 800 : 600, fontSize: 15,
                          border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
                          WebkitTapHighlightColor: "transparent",
                        }}>
                          <span style={{ fontSize: 20 }}>{l.icon}</span>
                          {l.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Tutoring section */}
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 800, letterSpacing: 1.2,
                  color: "rgba(255,255,255,0.4)", marginBottom: 8,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                  🎓 STUDY SHEETS
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                </div>

                {/* First item (All Lessons) full width */}
                <Link href={tutoringLinks[0].href} onClick={close} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "13px 16px", borderRadius: 12, textDecoration: "none", marginBottom: 8,
                  background: path === tutoringLinks[0].href ? "#2563EB" : "rgba(37,99,235,0.18)",
                  color: "white", fontWeight: path === tutoringLinks[0].href ? 800 : 700, fontSize: 16,
                  border: "1px solid rgba(37,99,235,0.25)",
                  WebkitTapHighlightColor: "transparent",
                }}>
                  <span style={{ fontSize: 22 }}>{tutoringLinks[0].icon}</span>
                  {tutoringLinks[0].label}
                  <svg style={{ marginLeft: "auto", opacity: 0.5 }} width={16} height={16} viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </Link>

                {/* Rest: 2-column grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {tutoringLinks.slice(1).map(l => {
                    const active = path === l.href;
                    return (
                      <Link key={l.href} href={l.href} onClick={close} style={{
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        gap: 6, padding: "14px 8px", borderRadius: 12, textDecoration: "none",
                        background: active ? "#2563EB" : "rgba(37,99,235,0.12)",
                        color: "white", fontWeight: active ? 800 : 600, fontSize: 13,
                        border: active ? "2px solid #2563EB" : "1px solid rgba(37,99,235,0.2)",
                        textAlign: "center", lineHeight: 1.3,
                        WebkitTapHighlightColor: "transparent",
                      }}>
                        <span style={{ fontSize: 24 }}>{l.icon}</span>
                        {l.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      {/* Desktop dropdown backdrop */}
      {tutoringOpen && <div onClick={() => setTutoringOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />}
    </>
  );
}
