"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type NavLink = { href: string; label: string; icon: string };

type NavSection = {
  id: string;
  label: string;
  accent: string;
  links: NavLink[];
};

const sections: NavSection[] = [
  {
    id: "practice",
    label: "Practice",
    accent: "#C9963A",
    links: [
      { href: "/review", label: "Review", icon: "🔁" },
      { href: "/pronounce", label: "Pronounce", icon: "🎙️" },
    ],
  },
  {
    id: "palestinian",
    label: "Palestinian",
    accent: "#B8860B",
    links: [
      { href: "/flashcards", label: "Flashcards", icon: "🃏" },
      { href: "/phrases", label: "Phrases", icon: "💬" },
      { href: "/quiz", label: "Quiz", icon: "🎯" },
      { href: "/lessons", label: "Lessons", icon: "📖" },
    ],
  },
  {
    id: "islamic",
    label: "Islamic",
    accent: "#10B981",
    links: [
      { href: "/quran", label: "Quran", icon: "📖" },
      { href: "/dua", label: "Duas", icon: "🤲" },
      { href: "/hadith", label: "Hadith", icon: "📿" },
    ],
  },
  {
    id: "course",
    label: "Arabic 101",
    accent: "#C9963A",
    links: [
      { href: "/arabic-101", label: "Course hub", icon: "📚" },
      { href: "/lessons", label: "Lessons", icon: "📖" },
      { href: "/review", label: "Review", icon: "🔁" },
      { href: "/pronounce", label: "Pronounce", icon: "🎙️" },
    ],
  },
  {
    id: "tutoring",
    label: "Tutoring Materials",
    accent: "#2563EB",
    links: [
      { href: "/tutoring", label: "All Lessons", icon: "🎓" },
      { href: "/tutoring/lesson?id=days", label: "Days of Week", icon: "📅" },
      { href: "/tutoring/lesson?id=wh-questions", label: "WH-Questions", icon: "❓" },
      { href: "/tutoring/lesson?id=connectors", label: "Connectors", icon: "🔗" },
      { href: "/tutoring/lesson?id=time-range-1", label: "Time — Past", icon: "⏰" },
      { href: "/tutoring/lesson?id=time-range-2", label: "Time — To", icon: "⏱️" },
      { href: "/tutoring/lesson?id=plurals", label: "Plural Forms", icon: "🔢" },
    ],
  },
];

function linkIsActive(href: string, path: string, search: string): boolean {
  if (!href.includes("?")) {
    if (href === "/tutoring") return path === "/tutoring";
    return path === href;
  }
  const [base, query] = href.split("?");
  return path === base && search.replace(/^\?/, "") === (query ?? "");
}

function sectionIsActive(section: NavSection, path: string, search: string): boolean {
  if (section.id === "tutoring") return path.startsWith("/tutoring");
  if (section.id === "course") {
    return path.startsWith("/arabic-101") || section.links.some((l) => linkIsActive(l.href, path, search));
  }
  return section.links.some((l) => linkIsActive(l.href, path, search));
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width={11}
      height={11}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      style={{
        transform: open ? "rotate(180deg)" : "none",
        transition: "transform 0.2s",
        opacity: 0.7,
        flexShrink: 0,
      }}
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}

function NavbarInner() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const closeAll = () => {
    setMenuOpen(false);
    setOpenId(null);
  };

  const toggleSection = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  };

  useEffect(() => {
    closeAll();
  }, [path, search]);

  useEffect(() => {
    if (!openId && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, menuOpen]);

  return (
    <>
      <nav
        style={{
          background: "var(--navy)",
          borderBottom: "3px solid var(--gold)",
          position: "sticky",
          top: 0,
          zIndex: 200,
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 56,
            gap: 12,
          }}
        >
          <Link
            href="/"
            onClick={closeAll}
            style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}
          >
            <span className="arabic" style={{ fontSize: 24, color: "var(--gold-light)", lineHeight: 1 }}>
              فلاحي
            </span>
            <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>Falahi Arabic</span>
          </Link>

          <div
            className="hidden-mobile"
            style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}
          >
            {sections.map((sec) => {
              const active = sectionIsActive(sec, path, search);
              const open = openId === sec.id;
              return (
                <div key={sec.id} style={{ position: "relative" }}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="menu"
                    onClick={() => toggleSection(sec.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 700,
                      color: active || open ? "var(--navy)" : "rgba(255,255,255,0.9)",
                      background: active ? sec.accent : open ? "rgba(255,255,255,0.14)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {sec.label}
                    <Chevron open={open} />
                  </button>
                  {open && (
                    <div
                      role="menu"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        zIndex: 300,
                        background: "white",
                        borderRadius: 14,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                        border: "2px solid #e8e0d0",
                        minWidth: 210,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          padding: "8px 14px 6px",
                          background: sec.accent,
                          color: "white",
                          fontSize: 11,
                          fontWeight: 800,
                          letterSpacing: 0.8,
                          textTransform: "uppercase",
                        }}
                      >
                        {sec.label}
                      </div>
                      {sec.links.map((l) => {
                        const isCurrent = linkIsActive(l.href, path, search);
                        return (
                          <Link
                            key={l.href}
                            href={l.href}
                            role="menuitem"
                            onClick={closeAll}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "10px 14px",
                              textDecoration: "none",
                              fontSize: 14,
                              fontWeight: isCurrent ? 800 : 600,
                              color: isCurrent ? sec.accent : "#222",
                              background: isCurrent ? `${sec.accent}22` : "transparent",
                              borderBottom: "1px solid #f0ece4",
                            }}
                          >
                            <span aria-hidden>{l.icon}</span>
                            {l.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setMenuOpen((o) => !o);
              setOpenId(null);
            }}
            className="show-mobile"
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{
              background: menuOpen ? "rgba(255,255,255,0.1)" : "none",
              border: "2px solid " + (menuOpen ? "rgba(255,255,255,0.3)" : "transparent"),
              cursor: "pointer",
              padding: "7px 9px",
              borderRadius: 10,
              color: "white",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {menuOpen ? (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="white">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div
            onClick={closeAll}
            className="show-mobile"
            style={{ position: "fixed", inset: 0, zIndex: 190, background: "rgba(0,0,0,0.55)" }}
          />
          <div
            className="show-mobile"
            style={{
              position: "fixed",
              top: 59,
              left: 0,
              right: 0,
              zIndex: 195,
              background: "var(--navy)",
              borderBottom: "3px solid var(--gold)",
              overflowY: "auto",
              maxHeight: "calc(100dvh - 59px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              display: "block",
            }}
          >
            <div style={{ padding: "10px 14px 28px" }}>
              {sections.map((sec) => {
                const open = openId === sec.id;
                const active = sectionIsActive(sec, path, search);
                return (
                  <div key={sec.id} style={{ marginBottom: 8 }}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => toggleSection(sec.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: active ? `2px solid ${sec.accent}` : "1px solid rgba(255,255,255,0.1)",
                        background: open ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
                        color: "white",
                        fontWeight: 800,
                        fontSize: 16,
                        cursor: "pointer",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 99,
                            background: sec.accent,
                            flexShrink: 0,
                          }}
                        />
                        {sec.label}
                      </span>
                      <Chevron open={open} />
                    </button>
                    {open && (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 8,
                          marginTop: 8,
                          padding: "0 2px 6px",
                        }}
                      >
                        {sec.links.map((l) => {
                          const exact = linkIsActive(l.href, path, search);
                          return (
                            <Link
                              key={l.href}
                              href={l.href}
                              onClick={closeAll}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "12px 14px",
                                borderRadius: 12,
                                textDecoration: "none",
                                background: exact ? sec.accent : "rgba(255,255,255,0.07)",
                                color: exact ? (sec.id === "tutoring" ? "white" : "var(--navy)") : "white",
                                fontWeight: exact ? 800 : 600,
                                fontSize: 14,
                                border: exact ? "none" : "1px solid rgba(255,255,255,0.08)",
                                WebkitTapHighlightColor: "transparent",
                              }}
                            >
                              <span style={{ fontSize: 18 }} aria-hidden>
                                {l.icon}
                              </span>
                              {l.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {openId && !menuOpen && (
        <div onClick={() => setOpenId(null)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />
      )}
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<nav style={{ background: "var(--navy)", borderBottom: "3px solid var(--gold)", height: 56 }} />}>
      <NavbarInner />
    </Suspense>
  );
}
