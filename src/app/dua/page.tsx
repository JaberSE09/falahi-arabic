"use client";

import { useEffect, useState } from "react";
import SpeakButton from "@/components/SpeakButton";
import PronounceButton from "@/components/PronounceButton";
import { duaGroupOrder, duaIsShort, duas, type Dua } from "@/lib/islamic";
import { getDuaProgress, markDua, type DuaMark, type DuaProgressMap } from "@/lib/duaProgress";

type View = "practice" | "browse";

export default function DuaPage() {
  const [view, setView] = useState<View>("practice");
  const [selectedId, setSelectedId] = useState<number | null>(duas[0]?.id ?? null);
  const [hidden, setHidden] = useState(false);
  const [marks, setMarks] = useState<DuaProgressMap>({});

  useEffect(() => {
    setMarks(getDuaProgress());
  }, []);

  const selected = duas.find((dua) => dua.id === selectedId) ?? null;

  const save = (id: number, mark: DuaMark) => {
    setMarks(markDua(id, mark));
  };

  const open = (dua: Dua) => {
    setSelectedId(dua.id);
    setHidden(false);
    setView("practice");
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>Daily Duas</h1>
          <p className="text-sm" style={{ color: "#666" }}>Practice duas in the order of the day — listen, hide, then recall.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["practice", "browse"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                background: view === mode ? "var(--navy)" : "white",
                color: view === mode ? "white" : "var(--navy)",
                border: "2px solid var(--navy)",
              }}
            >
              {mode === "practice" ? "Practice" : "Browse"}
            </button>
          ))}
        </div>
      </div>

      {view === "browse" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
          {duas.map((dua) => (
            <button
              key={dua.id}
              type="button"
              onClick={() => open(dua)}
              style={{
                textAlign: "left",
                background: "white",
                borderRadius: 16,
                padding: "20px 24px",
                border: "1px solid #e8e0d0",
                cursor: "pointer",
              }}
            >
              <DuaBrowseBody dua={dua} mark={marks[String(dua.id)]} />
            </button>
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 22 }}>
          {selected && (
            <DuaPractice
              dua={selected}
              hidden={hidden}
              mark={marks[String(selected.id)]}
              onHide={() => setHidden(true)}
              onPeek={() => setHidden(false)}
              onMark={(mark) => save(selected.id, mark)}
            />
          )}

          {duaGroupOrder.map((group) => {
            const items = duas.filter((dua) => dua.group === group);
            if (items.length === 0) return null;
            return (
              <section key={group}>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--navy)", margin: "0 0 10px" }}>{group}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map((dua) => {
                    const active = dua.id === selectedId;
                    const mark = marks[String(dua.id)];
                    return (
                      <button
                        key={dua.id}
                        type="button"
                        onClick={() => open(dua)}
                        style={{
                          textAlign: "left",
                          borderRadius: 12,
                          padding: "12px 14px",
                          cursor: "pointer",
                          background: active ? "var(--navy)" : "white",
                          color: active ? "white" : "var(--navy)",
                          border: active ? "2px solid var(--navy)" : "2px solid #e8e0d0",
                          fontWeight: 700,
                        }}
                      >
                        <span>{dua.title}</span>
                        <span style={{ display: "block", fontWeight: 600, fontSize: 13, opacity: 0.75, marginTop: 2 }}>
                          {dua.when}
                          {mark === "known" ? " · known" : mark === "learning" ? " · learning" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DuaBrowseBody({ dua, mark }: { dua: Dua; mark?: DuaMark }) {
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 3 }}>{dua.title}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "#e8f5ee", color: "#2D7A4F", fontWeight: 600 }}>{dua.group}</span>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "#f0ebe0", color: "var(--navy)", fontWeight: 500 }}>{dua.when}</span>
            {mark && (
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "#eef2ff", color: "#3730a3", fontWeight: 600 }}>
                {mark}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="arabic arabic-read" style={{ color: "var(--navy)", textAlign: "right", marginBottom: 12 }}>
        {dua.arabic}
      </div>
      <div style={{ fontSize: 16, fontStyle: "italic", color: "var(--gold)", marginBottom: 6 }}>{dua.transliteration}</div>
      <div style={{ fontSize: 17, color: "#222" }}>{dua.english}</div>
    </>
  );
}

function DuaPractice({
  dua,
  hidden,
  mark,
  onHide,
  onPeek,
  onMark,
}: {
  dua: Dua;
  hidden: boolean;
  mark?: DuaMark;
  onHide: () => void;
  onPeek: () => void;
  onMark: (mark: DuaMark) => void;
}) {
  const short = duaIsShort(dua.arabic);

  return (
    <div style={{ borderRadius: 20, background: "var(--navy)", color: "white", padding: "24px 20px" }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.4, opacity: 0.7, marginBottom: 6 }}>
        {dua.group.toUpperCase()}
        {mark === "known" ? " · KNOWN" : mark === "learning" ? " · LEARNING" : ""}
      </div>
      <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{dua.title}</div>
      <div style={{ opacity: 0.75, fontSize: 14, marginBottom: 16 }}>{dua.when}{dua.source ? ` · ${dua.source}` : ""}</div>

      {hidden ? (
        <>
          <p style={{ margin: "0 0 14px", lineHeight: 1.5, opacity: 0.9 }}>Say this dua from memory.</p>
          <button
            type="button"
            onClick={onPeek}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "2px solid rgba(255,255,255,0.35)",
              background: "transparent",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 16,
            }}
          >
            Peek
          </button>
          {short && (
            <div style={{ marginBottom: 16 }}>
              <PronounceButton
                key={dua.id}
                targetArabic={dua.arabic}
                targetTransliteration={dua.transliteration}
                size="lg"
                onResult={(ok) => onMark(ok ? "known" : "learning")}
              />
            </div>
          )}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => onMark("known")}
              style={{
                padding: "12px 18px",
                borderRadius: 12,
                background: "#2D7A4F",
                color: "white",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
              }}
            >
              I know it
            </button>
            <button
              type="button"
              onClick={() => onMark("learning")}
              style={{
                padding: "12px 18px",
                borderRadius: 12,
                background: "transparent",
                color: "white",
                fontWeight: 800,
                border: "2px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
              }}
            >
              Still learning
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="arabic arabic-hero" style={{ color: "var(--gold-light)", marginBottom: 12, textAlign: "right" }}>
            {dua.arabic}
          </div>
          <div style={{ marginBottom: 12 }}>
            <SpeakButton text={dua.arabic} size="lg" />
          </div>
          <div style={{ fontStyle: "italic", opacity: 0.75, marginBottom: 8 }}>{dua.transliteration}</div>
          <div style={{ fontWeight: 700, marginBottom: 16, lineHeight: 1.45 }}>{dua.english}</div>
          <button
            type="button"
            onClick={onHide}
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              background: "var(--gold)",
              color: "var(--navy)",
              fontWeight: 900,
              border: "none",
              cursor: "pointer",
              marginBottom: 16,
            }}
          >
            Hide &amp; recall
          </button>
        </>
      )}
    </div>
  );
}
