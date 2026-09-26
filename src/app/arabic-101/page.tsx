"use client";
import Link from "next/link";
import { arabic101Lessons } from "@/lib/arabic101";

export default function Arabic101Hub() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1D4ED8] to-[#1E293B] px-4 py-12 text-center">
        <div className="text-5xl mb-3">📖</div>
        <h1 className="text-3xl font-bold mb-2">Arabic 101</h1>
        <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-1">Miftaah Institute</p>
        <p className="text-gray-300 text-base max-w-md mx-auto">
          Nahw (Arabic Grammar) — from the foundations up. Study concepts, rules, and drill with answer keys.
        </p>
        <div className="mt-4 flex justify-center gap-4 text-sm text-blue-200">
          <span>📚 {arabic101Lessons.length} Lessons</span>
          <span>✏️ {arabic101Lessons.reduce((a, l) => a + l.drills.length, 0)} Drills</span>
          <span>📋 {arabic101Lessons.reduce((a, l) => a + l.rules.length, 0)} Rules</span>
        </div>
      </div>

      {/* Back link */}
      <div className="px-4 pt-4">
        <Link href="/" className="text-blue-400 text-sm hover:text-blue-300">← Back to Home</Link>
      </div>

      {/* Lessons grid */}
      <div className="px-4 py-6 max-w-2xl mx-auto grid gap-4">
        {arabic101Lessons.map((lesson, i) => (
          <Link key={lesson.id} href={`/arabic-101/lesson?id=${lesson.id}`}>
            <div
              className="rounded-xl p-5 flex items-start gap-4 cursor-pointer hover:opacity-90 transition-all active:scale-95"
              style={{ backgroundColor: lesson.color + "22", border: `1.5px solid ${lesson.color}55` }}
            >
              <div className="text-3xl flex-shrink-0">{lesson.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: lesson.color }}>
                    Lesson {i + 1}
                  </span>
                </div>
                <h2 className="text-white font-bold text-lg leading-tight mb-1">{lesson.title}</h2>
                <p className="text-gray-400 text-sm mb-3">{lesson.description}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>📋 {lesson.concepts.length} concepts</span>
                  <span>📌 {lesson.rules.length} rules</span>
                  <span>✏️ {lesson.drills.length} drills</span>
                </div>
              </div>
              <div className="text-gray-600 text-xl flex-shrink-0">›</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pb-12 text-center text-gray-600 text-xs px-4">
        Content from Miftaah Institute — Arabic 101 Nahw & Sarf curriculum
      </div>
    </div>
  );
}
