"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  countStatus,
  getProgress,
  recordCorrect,
  recordWrong,
  resetProgress,
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

  const correct = useCallback((id: number) => {
    setProgress(recordCorrect(id));
  }, []);

  const wrong = useCallback((id: number) => {
    setProgress(recordWrong(id));
  }, []);

  const reset = useCallback(() => {
    setProgress(resetProgress());
  }, []);

  const refresh = useCallback(() => {
    setProgress(getProgress());
  }, []);

  const counts = useMemo(
    () => countStatus(progress, vocabulary.length),
    [progress],
  );

  return { progress, mark, correct, wrong, reset, refresh, counts };
}
