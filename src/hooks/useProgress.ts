"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  countStatus,
  getProgress,
  setStatus,
  type ProgressMap,
  type WordStatus,
} from "@/lib/progress";
import { vocabulary } from "@/lib/vocabulary";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const mark = useCallback((id: number, status: WordStatus) => {
    setProgress(setStatus(id, status));
  }, []);

  const counts = useMemo(
    () => countStatus(progress, vocabulary.length),
    [progress],
  );

  return { progress, mark, counts };
}
