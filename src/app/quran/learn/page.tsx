"use client";

import Link from "next/link";
import { useQuranProgress } from "@/hooks/useQuranProgress";

export default function QuranLearnListPage() {
  const { counts, path, reset } = useQuranProgress();

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 8 }}>
        <Link href="/quran" style={{ color: "var(--gold)", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>
          ← Quran hub
        </Link>
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#f3f4f6", marginBottom: 8 }}>Learn Surahs</h1>
      <p style={{ color: "#d1d5db", fontSize: 16, lineHeight: 1.5, marginBottom: 20 }}>
        Beginner path: shortest Juz Amma surahs first, then Al-Fatiha. Learn one line, then chain 1→N.
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 20,
          fontWeight: 700,
          color: "#f3f4f6",
          fontSize: 15,
        }}
      >
        <span>{counts.known} known</span>
        <span>·</span>
        <span>{counts.learning} learning</span>
        <span>·</span>
        <span>Due {counts.due}</span>
        <span>·</span>
        <span>
          {counts.surahsDone}/{counts.surahCount} surahs
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {path.map(({ surah, summary }) => (
          <Link
            key={surah.slug}
            href={`/quran/learn/${surah.slug}`}
            style={{
              display: "block",
              textDecoration: "none",
              background: "#111827",
              borderRadius: 16,
              padding: "18px 20px",
              border: "2px solid #1f2937",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#9ca3af", letterSpacing: 0.4, marginBottom: 6 }}>
                  STEP {surah.order} · {surah.ayahCount} AYAH LINES
                </div>
                <div className="arabic arabic-read" style={{ color: "#f3f4f6", marginBottom: 4 }}>
                  {surah.nameAr}
                </div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#f3f4f6" }}>
                  {surah.nameEn}{" "}
                  <span style={{ fontWeight: 600, color: "#9ca3af", fontSize: 15 }}>({surah.number})</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 900, fontSize: 26, color: summary.percent === 100 ? "#2D7A4F" : "var(--gold)" }}>
                  {summary.percent}%
                </div>
                {summary.due > 0 ? (
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#e85d75" }}>Due {summary.due}</div>
                ) : summary.percent < 100 ? (
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af" }}>Start line {summary.nextAyah}</div>
                ) : (
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#2D7A4F" }}>Complete</div>
                )}
              </div>
            </div>
            <div style={{ marginTop: 14, height: 8, borderRadius: 99, background: "#374151", overflow: "hidden" }}>
              <div
                style={{
                  width: `${summary.percent}%`,
                  height: "100%",
                  background: summary.percent === 100 ? "#2D7A4F" : "var(--gold)",
                  borderRadius: 99,
                }}
              />
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined" && window.confirm("Reset all Quran line progress?")) {
            reset();
          }
        }}
        style={{
          padding: "10px 16px",
          borderRadius: 10,
          border: "2px solid #1f2937",
          background: "#111827",
          color: "#9ca3af",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        Reset Quran progress
      </button>
    </div>
  );
}
