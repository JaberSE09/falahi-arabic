"use client";

import Link from "next/link";
import { useQuranProgress } from "@/hooks/useQuranProgress";

export default function IslamicContinue() {
  const { continueTarget, counts } = useQuranProgress();
  const { surah, href, kind, due, nextAyah } = continueTarget;

  const title =
    kind === "due"
      ? `Review ${due} due line${due === 1 ? "" : "s"}`
      : kind === "done"
        ? "Path complete"
        : `Continue ${surah.nameEn}`;

  const detail =
    kind === "due"
      ? `${surah.nameEn} has lines ready to review.`
      : kind === "done"
        ? "Every short surah is known. Open one to keep it fresh."
        : `Line ${nextAyah} of ${surah.ayahCount} · ${counts.percent}% of the path known`;

  const action = kind === "due" ? "Review due lines" : kind === "done" ? "Review surah" : "Continue";

  return (
    <div
      style={{
        borderRadius: 18,
        background: "var(--navy)",
        color: "white",
        padding: "22px 24px",
        marginBottom: 14,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.4, opacity: 0.7, marginBottom: 6 }}>
        TODAY&apos;S QURAN
      </div>
      <div className="arabic arabic-read" style={{ color: "var(--gold-light)", marginBottom: 4 }}>
        {surah.nameAr}
      </div>
      <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 6 }}>{title}</div>
      <p style={{ margin: "0 0 16px", opacity: 0.85, fontSize: 15, lineHeight: 1.5 }}>{detail}</p>
      <Link
        href={href}
        style={{
          display: "inline-block",
          padding: "12px 22px",
          borderRadius: 12,
          background: "var(--gold)",
          color: "var(--navy)",
          fontWeight: 800,
          textDecoration: "none",
        }}
      >
        {action} →
      </Link>
    </div>
  );
}
