"use client";
import { useState } from "react";
import { quranVerses, quranTopics } from "@/lib/islamic";
import StudySet, { StudyCard } from "@/components/StudySet";
import SpeakButton from "@/components/SpeakButton";

export default function QuranPage() {
  const [view, setView] = useState<"browse"|"study">("browse");
  const [filterTopic, setFilterTopic] = useState("All");

  const filtered = filterTopic === "All" ? quranVerses : quranVerses.filter(v => v.topic === filterTopic);

  const cards: StudyCard[] = filtered.map(v => ({
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
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>📖 Quran Verses</h1>
          <p className="text-sm" style={{ color: "#666" }}>Learn key ayahs in Quranic Arabic with transliteration</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["browse","study"] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "8px 18px", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer",
              background: view===v ? "var(--navy)" : "white",
              color: view===v ? "white" : "var(--navy)",
              border: "2px solid var(--navy)",
            }}>{v === "browse" ? "📜 Browse" : "🎯 Study"}</button>
          ))}
        </div>
      </div>

      {/* Topic filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0 24px" }}>
        {["All", ...quranTopics].map(t => (
          <button key={t} onClick={() => setFilterTopic(t)} style={{
            padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: "pointer",
            background: filterTopic===t ? "var(--gold)" : "white",
            color: filterTopic===t ? "var(--navy)" : "#555",
            border: "2px solid " + (filterTopic===t ? "var(--gold)" : "#ddd"),
          }}>{t}</button>
        ))}
      </div>

      {view === "study" ? (
        <StudySet cards={cards} title="Quran Verses" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(v => (
            <div key={v.id} style={{ background: "white", borderRadius: 16, padding: "20px 24px", border: "1px solid #e8e0d0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "var(--navy)", color: "var(--gold-light)" }}>
                    {v.surahEn} : {v.ayah}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "#f0ebe0", color: "var(--navy)" }}>
                    {v.topic}
                  </span>
                </div>
                <SpeakButton text={v.arabic} size="md" />
              </div>
              <div className="arabic" style={{ fontSize: 28, lineHeight: 2, color: "var(--navy)", textAlign: "right", direction: "rtl", marginBottom: 12, fontWeight: 400 }}>
                {v.arabic}
              </div>
              <div style={{ fontSize: 14, fontStyle: "italic", color: "var(--gold)", marginBottom: 6 }}>{v.transliteration}</div>
              <div style={{ fontSize: 15, color: "#333" }}>{v.english}</div>
              {v.note && <div style={{ marginTop: 10, fontSize: 12, color: "#888", padding: "6px 12px", background: "#f9f6f0", borderRadius: 8 }}>💡 {v.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
