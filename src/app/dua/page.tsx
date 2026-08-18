"use client";
import { useState } from "react";
import { duas } from "@/lib/islamic";
import StudySet, { StudyCard } from "@/components/StudySet";
import SpeakButton from "@/components/SpeakButton";

export default function DuaPage() {
  const [view, setView] = useState<"browse"|"study">("browse");

  const cards: StudyCard[] = duas.map(d => ({
    id: d.id,
    arabic: d.arabic,
    transliteration: d.transliteration,
    english: d.english,
    subtitle: d.when,
    badge: d.source,
    note: undefined,
  }));

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>🤲 Daily Duas</h1>
          <p className="text-sm" style={{ color: "#666" }}>Authentic duas with Arabic, transliteration, and when to say them</p>
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

      <div style={{ marginBottom: 24 }} />

      {view === "study" ? (
        <StudySet cards={cards} title="Daily Duas" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {duas.map(d => (
            <div key={d.id} style={{ background: "white", borderRadius: 16, padding: "20px 24px", border: "1px solid #e8e0d0" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 3 }}>{d.title}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "#e8f5ee", color: "#2D7A4F", fontWeight: 600 }}>{d.when}</span>
                    {d.source && <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "#f0ebe0", color: "var(--navy)", fontWeight: 500 }}>{d.source}</span>}
                  </div>
                </div>
                <SpeakButton text={d.arabic} size="md" />
              </div>
              <div className="arabic" style={{ fontSize: 24, lineHeight: 2, color: "var(--navy)", textAlign: "right", direction: "rtl", marginBottom: 12 }}>
                {d.arabic}
              </div>
              <div style={{ fontSize: 13, fontStyle: "italic", color: "var(--gold)", marginBottom: 6 }}>{d.transliteration}</div>
              <div style={{ fontSize: 14, color: "#333" }}>{d.english}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
