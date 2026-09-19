"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type NavLink = { href: string; label: string };

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
      { href: "/review", label: "Review" },
      { href: "/pronounce", label: "Pronounce" },
    ],
  },
  {
    id: "learn",
    label: "Learn",
    accent: "#B8860B",
    links: [
      { href: "/flashcards", label: "Flashcards" },
      { href: "/phrases", label: "Phrases" },
      { href: "/quiz", label: "Quiz" },
      { href: "/lessons", label: "Lessons" },
      { href: "/arabic-101", label: "Arabic 101" },
    ],
  },
  {
    id: "islamic",
    label: "Islamic",
    accent: "#10B981",
    links: [
      { href: "/quran", label: "Quran" },
      { href: "/dua", label: "Duas" },
      { href: "/hadith", label: "Hadith" },
    ],
  },
];

function linkIsActive(href: string, path: string): boolean {
  if (href === "/quran") return path === "/quran" || path.startsWith("/quran/");
  if (href === "/tutoring") return path.startsWith("/tutoring");
  return path === href;
}

function sectionIsActive(section: NavSection, path: string): boolean {
  return section.links.some((l) => linkIsActive(l.href, path));
}

function tutoringActive(path: string): boolean {
  return path.startsWith("/tutoring");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width={10}
      height={10}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      style={{
        transform: open ? "rotate(180deg)" : "none",
        transition: "transform 0.2s ease",
        opacity: 0.65,
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
      <nav className="nav-bar" aria-label="Main">
        <div className="nav-inner">
          <Link href="/" onClick={closeAll} className="nav-brand">
            <span className="arabic nav-brand-ar">فلاحي</span>
            <span className="nav-brand-en">Arabic</span>
          </Link>

          <div className="hidden-mobile nav-desktop">
            {sections.map((sec) => {
              const active = sectionIsActive(sec, path);
              const open = openId === sec.id;
              return (
                <div key={sec.id} style={{ position: "relative" }}>
                  <button
                    type="button"
                    className={`nav-trigger${active ? " is-active" : ""}${open ? " is-open" : ""}`}
                    aria-expanded={open}
                    aria-haspopup="menu"
                    onClick={() => toggleSection(sec.id)}
                  >
                    {sec.label}
                    <Chevron open={open} />
                    {active && <span className="nav-trigger-underline" style={{ background: sec.accent }} />}
                  </button>
                  {open && (
                    <div
                      role="menu"
                      className="nav-dropdown"
                      style={{ borderLeftColor: sec.accent }}
                    >
                      <div className="nav-dropdown-label" style={{ color: sec.accent }}>
                        {sec.label}
                      </div>
                      {sec.links.map((l) => {
                        const isCurrent = linkIsActive(l.href, path);
                        return (
                          <Link
                            key={l.href}
                            href={l.href}
                            role="menuitem"
                            onClick={closeAll}
                            className={`nav-dropdown-link${isCurrent ? " is-current" : ""}`}
                            style={
                              isCurrent
                                ? { color: sec.accent, background: `${sec.accent}18` }
                                : undefined
                            }
                          >
                            {l.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/tutoring"
              onClick={closeAll}
              className={`nav-trigger nav-trigger-link${tutoringActive(path) ? " is-active" : ""}`}
            >
              Tutoring
              {tutoringActive(path) && (
                <span className="nav-trigger-underline" style={{ background: "#2563EB" }} />
              )}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              setMenuOpen((o) => !o);
              setOpenId(null);
            }}
            className="show-mobile nav-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div onClick={closeAll} className="show-mobile nav-backdrop" aria-hidden />
          <div className="show-mobile nav-drawer" role="dialog" aria-label="Site menu">
            <div className="nav-drawer-body">
              {sections.map((sec) => {
                const open = openId === sec.id;
                const active = sectionIsActive(sec, path);
                return (
                  <div key={sec.id} className="nav-drawer-section">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => toggleSection(sec.id)}
                      className={`nav-drawer-header${active ? " is-active" : ""}${open ? " is-open" : ""}`}
                      style={active ? { borderColor: sec.accent } : undefined}
                    >
                      <span className="nav-drawer-header-label">
                        <span className="nav-drawer-dot" style={{ background: sec.accent }} />
                        {sec.label}
                      </span>
                      <Chevron open={open} />
                    </button>
                    {open && (
                      <div className="nav-drawer-links">
                        {sec.links.map((l) => {
                          const exact = linkIsActive(l.href, path);
                          return (
                            <Link
                              key={l.href}
                              href={l.href}
                              onClick={closeAll}
                              className={`nav-drawer-link${exact ? " is-current" : ""}`}
                              style={
                                exact
                                  ? { background: sec.accent, color: sec.id === "islamic" ? "white" : "var(--navy)" }
                                  : undefined
                              }
                            >
                              {l.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="/tutoring"
                onClick={closeAll}
                className={`nav-drawer-direct${tutoringActive(path) ? " is-current" : ""}`}
              >
                <span className="nav-drawer-dot" style={{ background: "#2563EB" }} />
                Tutoring
              </Link>
            </div>
          </div>
        </>
      )}

      {openId && !menuOpen && (
        <div onClick={() => setOpenId(null)} className="nav-clickaway" aria-hidden />
      )}
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<nav className="nav-bar" style={{ height: 60 }} aria-hidden />}>
      <NavbarInner />
    </Suspense>
  );
}
