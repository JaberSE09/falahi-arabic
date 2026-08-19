"use client";
import { useState } from "react";
import { vocabulary, categories, Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";

function FlashCard({ word, onNext, onPrev, index, total }: {
  word: Word; onNext: () => void; onPrev: () => void; index: number; total: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const next = () => { setFlipped(false); setTimeout(onNext, 150); };
  const prev = () => { setFlipped(false); setTimeout(onPrev, 150); };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      {/* Progress */}
      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 10, borderRadius: 99, background: "#ddd" }}>
          <div style={{ height: 10, borderRadius: 99, background: "var(--gold)", width: `${((index+1)/total)*100}%`, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 17, fontWeight: 700, color: "var(--navy)", minWidth: 56 }}>{index+1}/{total}</span>
      </div>

      {/* Card */}
      <div
        onClick={(e) => {
          if (e.target instanceof Element && e.target.closest("button")) return;
          setFlipped(f => !f);
        }}
        style={{ width: "100%", maxWidth: 520, height: "min(320px, 60vw)", perspective: 1000, cursor: "pointer" }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.55s", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
          {/* Front */}
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 22, background: "var(--navy)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
            <div className="arabic" style={{ fontSize: "clamp(40px, 10vw, 64px)", color: "var(--gold-light)", marginBottom: 16, lineHeight: 1.5 }}>{word.arabic}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <SpeakButton text={word.arabic} size="lg" />
              <span style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>tap card to reveal</span>
            </div>
          </div>
          {/* Back */}
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 22, background: "var(--gold)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: "clamp(22px,5vw,30px)", fontWeight: 800, color: "white", marginBottom: 6, lineHeight: 1.3 }}>{word.english}</div>
            <div style={{ fontSize: 18, fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginBottom: 14 }}>{word.transliteration}</div>
            {word.example && (
              <div style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(255,255,255,0.3)", maxWidth: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
                  <SpeakButton text={word.example} size="sm" />
                  <span className="arabic" style={{ fontSize: 20, color: "white" }}>{word.example}</span>
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>{word.exampleTranslation}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav buttons — large touch targets */}
      <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 400 }}>
        <button onClick={prev} disabled={index===0} style={{
          flex: 1, padding: "16px 0", borderRadius: 14, fontWeight: 700, fontSize: 18,
          background: index===0 ? "#e0ddd8" : "white", color: index===0 ? "#aaa" : "var(--navy)",
          border: "3px solid " + (index===0 ? "#e0ddd8" : "var(--navy)"), cursor: index===0 ? "not-allowed" : "pointer",
        }}>← Prev</button>
        <button onClick={next} disabled={index===total-1} style={{
          flex: 1, padding: "16px 0", borderRadius: 14, fontWeight: 700, fontSize: 18,
          background: index===total-1 ? "#e0ddd8" : "var(--navy)", color: index===total-1 ? "#aaa" : "white",
          border: "3px solid " + (index===total-1 ? "#e0ddd8" : "var(--navy)"), cursor: index===total-1 ? "not-allowed" : "pointer",
        }}>Next →</button>
      </div>

      <span style={{ fontSize: 15, padding: "7px 18px", borderRadius: 99, background: "var(--navy)", color: "var(--gold-light)", fontWeight: 700 }}>{word.category}</span>
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
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginBottom: 18 }}>Flashcards</h1>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10, marginBottom: 28, scrollbarWidth: "none" }}>
        {["All", ...categories].map(cat => (
          <button key={cat} onClick={() => handleCat(cat)} style={{
            padding: "10px 20px", borderRadius: 99, fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            background: selectedCat===cat ? "var(--navy)" : "white",
            color: selectedCat===cat ? "white" : "var(--navy)",
            border: "2px solid var(--navy)",
          }}>
            {cat} ({cat==="All" ? vocabulary.length : vocabulary.filter(w=>w.category===cat).length})
          </button>
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
