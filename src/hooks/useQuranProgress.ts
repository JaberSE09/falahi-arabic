"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  countPathProgress,
  getContinueTarget,
  getDueAyahs,
  getQuranProgress,
  getSurahProgress,
  recordAyahCorrect,
  recordAyahWrong,
  resetQuranProgress,
  type AyahProgressMap,
} from "@/lib/quranProgress";
import { quranSurahs, type QuranSurah } from "@/lib/quranSurahs";

export function useQuranProgress() {
  const [progress, setProgress] = useState<AyahProgressMap>({});

  useEffect(() => {
    setProgress(getQuranProgress());
  }, []);

  const correct = useCallback((surahNumber: number, ayah: number) => {
    setProgress(recordAyahCorrect(surahNumber, ayah));
  }, []);

  const wrong = useCallback((surahNumber: number, ayah: number) => {
    setProgress(recordAyahWrong(surahNumber, ayah));
  }, []);

  const reset = useCallback(() => {
    setProgress(resetQuranProgress());
  }, []);

  const refresh = useCallback(() => {
    setProgress(getQuranProgress());
  }, []);

  const counts = useMemo(() => countPathProgress(progress), [progress]);
  const continueTarget = useMemo(() => getContinueTarget(progress), [progress]);

  const surahSummary = useCallback(
    (surah: QuranSurah) => getSurahProgress(surah, progress),
    [progress],
  );

  const dueInSurah = useCallback(
    (surah: QuranSurah) => getDueAyahs(progress, surah),
    [progress],
  );

  const path = useMemo(
    () =>
      [...quranSurahs]
        .sort((a, b) => a.order - b.order)
        .map((surah) => ({
          surah,
          summary: getSurahProgress(surah, progress),
        })),
    [progress],
  );

  return {
    progress,
    correct,
    wrong,
    reset,
    refresh,
    counts,
    continueTarget,
    surahSummary,
    dueInSurah,
    path,
  };
}
