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
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>Learn Surahs</h1>
      <p style={{ color: "#555", fontSize: 16, lineHeight: 1.5, marginBottom: 20 }}>
        Beginner path: shortest Juz Amma surahs first, then Al-Fatiha. Learn one line, then chain 1→N.
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 20,
          fontWeight: 700,
          color: "var(--navy)",
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
              background: "white",
              borderRadius: 16,
              padding: "18px 20px",
              border: "2px solid #e8e0d0",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#888", letterSpacing: 0.4, marginBottom: 6 }}>
                  STEP {surah.order} · {surah.ayahCount} AYAH LINES
                </div>
                <div className="arabic" style={{ fontSize: 32, color: "var(--navy)", lineHeight: 1.25, marginBottom: 4 }}>
                  {surah.nameAr}
                </div>
                <div style={{ fontWeight: 800, fontSize: 18, color: "var(--navy)" }}>
                  {surah.nameEn}{" "}
                  <span style={{ fontWeight: 600, color: "#888", fontSize: 15 }}>({surah.number})</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 900, fontSize: 26, color: summary.percent === 100 ? "#2D7A4F" : "var(--gold)" }}>
                  {summary.percent}%
                </div>
                {summary.due > 0 ? (
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#e85d75" }}>Due {summary.due}</div>
                ) : summary.percent < 100 ? (
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#666" }}>Start line {summary.nextAyah}</div>
                ) : (
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#2D7A4F" }}>Complete</div>
                )}
              </div>
            </div>
            <div style={{ marginTop: 14, height: 8, borderRadius: 99, background: "#eee", overflow: "hidden" }}>
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
          border: "2px solid #ddd",
          background: "white",
          color: "#888",
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
