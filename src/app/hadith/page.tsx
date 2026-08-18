"use client";
import { useState } from "react";
import { hadiths, hadithTopics } from "@/lib/islamic";
import StudySet, { StudyCard } from "@/components/StudySet";
import SpeakButton from "@/components/SpeakButton";

export default function HadithPage() {
  const [view, setView] = useState<"browse"|"study">("browse");
  const [filterTopic, setFilterTopic] = useState("All");

  const filtered = filterTopic === "All" ? hadiths : hadiths.filter(h => h.topic === filterTopic);

  const cards: StudyCard[] = filtered.map(h => ({
    id: h.id,
    arabic: h.arabic,
    transliteration: h.transliteration,
    english: h.english,
    subtitle: `${h.narrator} · ${h.source}`,
    badge: h.topic,
  }));

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>📿 Hadith</h1>
          <p className="text-sm" style={{ color: "#666" }}>Prophetic narrations with Arabic, transliteration, and source</p>
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
        {["All", ...hadithTopics].map(t => (
          <button key={t} onClick={() => setFilterTopic(t)} style={{
            padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: "pointer",
            background: filterTopic===t ? "var(--gold)" : "white",
            color: filterTopic===t ? "var(--navy)" : "#555",
            border: "2px solid " + (filterTopic===t ? "var(--gold)" : "#ddd"),
          }}>{t}</button>
        ))}
      </div>

      {view === "study" ? (
        <StudySet cards={cards} title="Hadith" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(h => (
            <div key={h.id} style={{ background: "white", borderRadius: 16, padding: "20px 24px", border: "1px solid #e8e0d0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "var(--navy)", color: "var(--gold-light)" }}>{h.topic}</span>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "#f0ebe0", color: "#666" }}>{h.source}</span>
                </div>
                <SpeakButton text={h.arabic} size="md" />
              </div>
              <div className="arabic" style={{ fontSize: 24, lineHeight: 2, color: "var(--navy)", textAlign: "right", direction: "rtl", marginBottom: 12 }}>
                {h.arabic}
              </div>
              <div style={{ fontSize: 13, fontStyle: "italic", color: "var(--gold)", marginBottom: 6 }}>{h.transliteration}</div>
              <div style={{ fontSize: 14, color: "#333", marginBottom: 8 }}>{h.english}</div>
              <div style={{ fontSize: 12, color: "#888" }}>Narrated by: {h.narrator}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
