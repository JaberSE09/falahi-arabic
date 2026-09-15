"use client";

import { useState } from "react";
import Link from "next/link";
import { quranVerses, quranTopics } from "@/lib/islamic";
import StudySet, { type StudyCard } from "@/components/StudySet";
import SpeakButton from "@/components/SpeakButton";
import { useQuranProgress } from "@/hooks/useQuranProgress";

type HubTab = "learn" | "highlights";

export default function QuranPage() {
  const [tab, setTab] = useState<HubTab>("learn");
  const [view, setView] = useState<"browse" | "study">("browse");
  const [filterTopic, setFilterTopic] = useState("All");
  const { counts, path } = useQuranProgress();

  const filtered =
    filterTopic === "All" ? quranVerses : quranVerses.filter((v) => v.topic === filterTopic);

  const cards: StudyCard[] = filtered.map((v) => ({
    id: v.id,
    arabic: v.arabic,
    transliteration: v.transliteration,
    english: v.english,
    subtitle: `${v.surahEn} ${v.ayah}`,
    badge: v.topic,
    note: v.note,
  }));

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 8 }}>
          Quran
        </h1>
        <p style={{ color: "#555", fontSize: 16, lineHeight: 1.5, margin: 0 }}>
          Learn short surahs <strong>line by line</strong> — listen, recall, chain ayahs, then review.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {(
          [
            { key: "learn" as const, label: "Learn Surahs" },
            { key: "highlights" as const, label: "Highlights" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            style={{
              padding: "10px 18px",
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              background: tab === t.key ? "var(--navy)" : "white",
              color: tab === t.key ? "white" : "var(--navy)",
              border: "2px solid var(--navy)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "learn" ? (
        <>
          <div
            style={{
              borderRadius: 18,
              background: "var(--navy)",
              color: "white",
              padding: "22px 24px",
              marginBottom: 20,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Your path</div>
            <div style={{ opacity: 0.85, fontSize: 15, marginBottom: 14, lineHeight: 1.5 }}>
              Short Juz Amma surahs first, then full Al-Fatiha. One ayah at a time, then chain them.
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontWeight: 700, fontSize: 14 }}>
              <span>{counts.percent}% lines known</span>
              <span>
                {counts.surahsDone}/{counts.surahCount} surahs done
              </span>
              <span>Due {counts.due}</span>
            </div>
            <Link
              href="/quran/learn"
              style={{
                display: "inline-block",
                marginTop: 16,
                padding: "12px 22px",
                borderRadius: 12,
                background: "var(--gold)",
                color: "var(--navy)",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Continue learning →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {path.map(({ surah, summary }) => (
              <Link
                key={surah.slug}
                href={`/quran/learn/${surah.slug}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "white",
                  borderRadius: 16,
                  padding: "16px 18px",
                  border: "2px solid #e8e0d0",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#888", marginBottom: 4 }}>
                      #{surah.order} · Surah {surah.number} · {surah.ayahCount} lines
                    </div>
                    <div className="arabic" style={{ fontSize: 28, color: "var(--navy)", lineHeight: 1.3 }}>
                      {surah.nameAr}
                    </div>
                    <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: 17 }}>{surah.nameEn}</div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 72 }}>
                    <div style={{ fontWeight: 900, fontSize: 22, color: "var(--gold)" }}>{summary.percent}%</div>
                    {summary.due > 0 && (
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#e85d75" }}>Due {summary.due}</div>
                    )}
                    {summary.percent < 100 && summary.due === 0 && (
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>
                        Line {summary.nextAyah}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 12,
                    height: 6,
                    borderRadius: 99,
                    background: "#eee",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${summary.percent}%`,
                      height: "100%",
                      background: "var(--gold)",
                      borderRadius: 99,
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
            <p style={{ color: "#666", fontSize: 15, margin: 0 }}>
              Key ayahs for meaning and reflection (not full surahs).
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {(["browse", "study"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    background: view === v ? "var(--navy)" : "white",
                    color: view === v ? "white" : "var(--navy)",
                    border: "2px solid var(--navy)",
                  }}
                >
                  {v === "browse" ? "Browse" : "Study"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 24px" }}>
            {["All", ...quranTopics].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterTopic(t)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  background: filterTopic === t ? "var(--gold)" : "white",
                  color: filterTopic === t ? "var(--navy)" : "#555",
                  border: "2px solid " + (filterTopic === t ? "var(--gold)" : "#ddd"),
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {view === "study" ? (
            <StudySet cards={cards} title="Quran Verses" />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {filtered.map((v) => (
                <div
                  key={v.id}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "20px 24px",
                    border: "1px solid #e8e0d0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: "var(--navy)",
                          color: "var(--gold-light)",
                        }}
                      >
                        {v.surahEn} : {v.ayah}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: "#f0ebe0",
                          color: "var(--navy)",
                        }}
                      >
                        {v.topic}
                      </span>
                    </div>
                    <SpeakButton text={v.arabic} size="md" />
                  </div>
                  <div
                    className="arabic"
                    style={{
                      fontSize: 34,
                      lineHeight: 2.2,
                      color: "var(--navy)",
                      textAlign: "right",
                      direction: "rtl",
                      marginBottom: 12,
                      fontWeight: 400,
                    }}
                  >
                    {v.arabic}
                  </div>
                  <div style={{ fontSize: 17, fontStyle: "italic", color: "var(--gold)", marginBottom: 6 }}>
                    {v.transliteration}
                  </div>
                  <div style={{ fontSize: 17, color: "#222" }}>{v.english}</div>
                  {v.note && (
                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        color: "#888",
                        padding: "6px 12px",
                        background: "#f9f6f0",
                        borderRadius: 8,
                      }}
                    >
                      {v.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
