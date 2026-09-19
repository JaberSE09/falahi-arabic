"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function ProgressHint() {
  const { counts } = useProgress();
  return (
    <div style={{ marginBottom: 24, textAlign: "center" }}>
      <p style={{ color: "#555", fontSize: 15, marginBottom: 12, fontWeight: 600 }}>
        Known {counts.known} · Missed {counts.missed} · Due {counts.due} · New {counts.unseen}
      </p>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 14 }}>
        Best plan: Due → Missed → New → Pronounce
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/review"
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            background: "var(--navy)",
            color: "white",
            fontWeight: 800,
            textDecoration: "none",
            fontSize: 15,
          }}
        >
          Review ({counts.due + counts.missed})
        </Link>
        <Link
          href="/pronounce"
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            background: "var(--gold)",
            color: "white",
            fontWeight: 800,
            textDecoration: "none",
            fontSize: 15,
          }}
        >
          Pronounce
        </Link>
        <Link
          href="/flashcards"
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            background: "white",
            color: "var(--navy)",
            fontWeight: 800,
            textDecoration: "none",
            fontSize: 15,
            border: "2px solid var(--navy)",
          }}
        >
          Study new
        </Link>
      </div>
    </div>
  );
}
