"use client";

import { useProgress } from "@/hooks/useProgress";

export default function ProgressHint() {
  const { counts } = useProgress();
  return (
    <p style={{ textAlign: "center", color: "#555", fontSize: 15, marginBottom: 20, fontWeight: 600 }}>
      Known {counts.known} · Learning {counts.learning + counts.unseen}
    </p>
  );
}
