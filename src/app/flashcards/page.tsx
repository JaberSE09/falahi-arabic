"use client";
import { useState, useCallback } from "react";
import { vocabulary, categories, Word } from "@/lib/vocabulary";
import SpeakButton from "@/components/SpeakButton";

function FlashCard({ word, onNext, onPrev, index, total }: {
  word: Word; onNext: () => void; onPrev: () => void; index: number; total: number;
}) {
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => { setFlipped(false); setTimeout(onNext, 150); };
  const handlePrev = () => { setFlipped(false); setTimeout(onPrev, 150); };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full" style={{ background: "#e8e0d0" }}>
          <div className="h-2 rounded-full transition-all" style={{ width: `${((index + 1) / total) * 100}%`, background: "var(--gold)" }} />
        </div>
        <span className="text-sm font-medium" style={{ color: "var(--navy)", minWidth: 60 }}>{index + 1} / {total}</span>
      </div>

      {/* Card */}
      <div className="card-flip w-full" style={{ maxWidth: 500, height: 320 }}>
        <div className="relative w-full h-full" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transformStyle: "preserve-3d", transition: "transform 0.6s" }}>
          {/* Front — Arabic */}
          <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-lg"
            style={{ background: "var(--navy)", backfaceVisibility: "hidden" }}>
            <div className="arabic text-6xl mb-4" style={{ color: "var(--gold-light)" }}>{word.arabic}</div>
            <div className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Click card to reveal · Tap 🔊 to hear</div>
            {/* Speak button on front */}
            <div className="flex items-center gap-3">
              <SpeakButton text={word.arabic} size="lg" />
              <button onClick={() => setFlipped(!flipped)} style={{
                padding: "10px 24px", borderRadius: 10, background: "var(--gold)",
                color: "var(--navy)", fontWeight: 700, border: "none", cursor: "pointer", fontSize: 14,
              }}>Reveal →</button>
            </div>
          </div>
          {/* Back — English */}
          <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-lg"
            style={{ background: "var(--gold)", backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <div className="text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>{word.english}</div>
            <div className="text-lg mb-1 italic" style={{ color: "var(--navy-light)" }}>{word.transliteration}</div>
            <div className="flex items-center gap-2 mb-3">
              <SpeakButton text={word.arabic} size="md" />
              <span className="arabic text-xl" style={{ color: "var(--navy)" }}>{word.arabic}</span>
            </div>
            {word.example && (
              <div className="p-3 rounded-lg text-sm" style={{ background: "rgba(255,255,255,0.45)", color: "var(--navy)" }}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <SpeakButton text={word.example} size="sm" />
                  <span className="arabic text-base">{word.example}</span>
                </div>
                <div className="italic text-xs">{word.exampleTranslation}</div>
              </div>
            )}
            <button onClick={() => setFlipped(false)} style={{
              marginTop: 12, padding: "8px 20px", borderRadius: 10,
              background: "var(--navy)", color: "white", fontWeight: 600,
              border: "none", cursor: "pointer", fontSize: 13,
            }}>← Back</button>
          </div>
        </div>
      </div>

      {/* Nav controls */}
      <div className="flex gap-4">
        <button onClick={handlePrev} disabled={index === 0} style={{
          padding: "10px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15,
          background: index === 0 ? "#e8e0d0" : "white",
          color: index === 0 ? "#aaa" : "var(--navy)",
          border: "2px solid var(--navy)", cursor: index === 0 ? "not-allowed" : "pointer",
        }}>← Prev</button>
        <button onClick={handleNext} disabled={index === total - 1} style={{
          padding: "10px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15,
          background: index === total - 1 ? "#e8e0d0" : "var(--navy)",
          color: index === total - 1 ? "#aaa" : "white",
          border: "2px solid var(--navy)", cursor: index === total - 1 ? "not-allowed" : "pointer",
        }}>Next →</button>
      </div>

      <div className="px-4 py-2 rounded-full text-xs font-medium" style={{ background: "var(--navy)", color: "white" }}>
        {word.category}
      </div>
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
      <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>Flashcards</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", ...categories].map(cat => (
          <button key={cat} onClick={() => handleCat(cat)} style={{
            padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer",
            background: selectedCat === cat ? "var(--navy)" : "white",
            color: selectedCat === cat ? "white" : "var(--navy)",
            border: "2px solid var(--navy)",
          }}>{cat} ({cat === "All" ? vocabulary.length : vocabulary.filter(w => w.category === cat).length})</button>
        ))}
      </div>
      <FlashCard
        word={words[index]}
        onNext={() => setIndex(i => Math.min(i + 1, words.length - 1))}
        onPrev={() => setIndex(i => Math.max(i - 1, 0))}
        index={index}
        total={words.length}
      />
    </div>
  );
}
