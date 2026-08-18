"use client";
import { useState, useCallback } from "react";
import { vocabulary, categories, Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";

function FlashCard({ word, onNext, onPrev, index, total }: {
  word: Word; onNext: () => void; onPrev: () => void; index: number; total: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const next = () => { setFlipped(false); setTimeout(onNext, 150); };
  const prev = () => { setFlipped(false); setTimeout(onPrev, 150); };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      {/* Progress */}
      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 99, background: "#e8e0d0" }}>
          <div style={{ height: 6, borderRadius: 99, background: "var(--gold)", width: `${((index+1)/total)*100}%`, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", minWidth: 50 }}>{index+1}/{total}</span>
      </div>

      {/* Card */}
      <div onClick={() => setFlipped(f => !f)} style={{ width: "100%", maxWidth: 480, height: "min(300px, 55vw)", perspective: 1000, cursor: "pointer" }}>
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.55s", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
          {/* Front */}
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 20, background: "var(--navy)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
            <div className="arabic" style={{ fontSize: "clamp(32px,8vw,54px)", color: "var(--gold-light)", marginBottom: 12, lineHeight: 1.5 }}>{word.arabic}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <SpeakButton text={word.arabic} size="md" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>tap to reveal</span>
            </div>
          </div>
          {/* Back */}
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 20, background: "var(--gold)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: "clamp(18px,4vw,24px)", fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{word.english}</div>
            <div style={{ fontSize: 15, fontStyle: "italic", color: "var(--navy-light)", marginBottom: 10 }}>{word.transliteration}</div>
            {word.example && (
              <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.4)", maxWidth: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4 }}>
                  <SpeakButton text={word.example} size="sm" />
                  <span className="arabic" style={{ fontSize: 16, color: "var(--navy)" }}>{word.example}</span>
                </div>
                <div style={{ fontSize: 12, fontStyle: "italic", color: "var(--navy-light)" }}>{word.exampleTranslation}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={prev} disabled={index===0} style={{ padding: "12px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, background: index===0?"#e8e0d0":"white", color: index===0?"#bbb":"var(--navy)", border: "2px solid " + (index===0?"#e8e0d0":"var(--navy)"), cursor: index===0?"not-allowed":"pointer" }}>← Prev</button>
        <button onClick={next} disabled={index===total-1} style={{ padding: "12px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, background: index===total-1?"#e8e0d0":"var(--navy)", color: index===total-1?"#bbb":"white", border: "2px solid " + (index===total-1?"#e8e0d0":"var(--navy)"), cursor: index===total-1?"not-allowed":"pointer" }}>Next →</button>
      </div>

      <span style={{ fontSize: 12, padding: "5px 14px", borderRadius: 99, background: "var(--navy)", color: "white", fontWeight: 600 }}>{word.category}</span>
    </div>
  );
}

export default function Flashcards() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [index, setIndex] = useState(0);
  const words = selectedCat === "All" ? vocabulary : vocabulary.filter(w => w.category === selectedCat);
  const handleCat = (cat: string) => { setSelectedCat(cat); setIndex(0); };

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>Flashcards</h1>
      {/* Category filter — horizontal scroll on mobile */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 24, scrollbarWidth: "none" }}>
        {["All", ...categories].map(cat => (
          <button key={cat} onClick={() => handleCat(cat)} style={{
            padding: "7px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            background: selectedCat===cat ? "var(--navy)" : "white",
            color: selectedCat===cat ? "white" : "var(--navy)",
            border: "2px solid var(--navy)",
          }}>{cat} ({cat==="All" ? vocabulary.length : vocabulary.filter(w=>w.category===cat).length})</button>
        ))}
      </div>
      <FlashCard
        word={words[index]}
        onNext={() => setIndex(i => Math.min(i+1, words.length-1))}
        onPrev={() => setIndex(i => Math.max(i-1, 0))}
        index={index} total={words.length}
      />
    </div>
  );
}
