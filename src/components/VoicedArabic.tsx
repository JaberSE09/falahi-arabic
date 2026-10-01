"use client";

import SpeakButton from "@/components/SpeakButton";

/** An Arabic letter, then harakat, tatweel, or spaces that stay inside the phrase. */
const ARABIC_PHRASE =
  /[\u0640\u064B-\u0652\u0670]*[\u0621-\u064A\u0671-\u06D3](?:[\u0621-\u064A\u0640\u064B-\u0652\u0670\u0671-\u06D3]|[ \u00A0]+(?=[\u0640\u064B-\u0652\u0670]*[\u0621-\u064A\u0671-\u06D3]))*/g;

export function arabicPhrases(text: string): string[] {
  return [...text.matchAll(new RegExp(ARABIC_PHRASE.source, "g"))]
    .map((match) => match[0].trim())
    .filter((phrase) => phrase.length > 0);
}

type Part = { text: string; speak?: string };

function splitVoiced(text: string): Part[] {
  const parts: Part[] = [];
  let last = 0;
  for (const match of text.matchAll(new RegExp(ARABIC_PHRASE.source, "g"))) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: text.slice(last, index) });
    const phrase = match[0].trim();
    parts.push({ text: match[0], speak: phrase });
    last = index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  if (parts.length === 0) parts.push({ text });
  return parts;
}

function Listen({ text, size }: { text: string; size: "sm" | "md" }) {
  return (
    <span className="inline-flex rounded-full ring-2 ring-white/50 align-middle">
      <SpeakButton text={text} size={size} />
    </span>
  );
}

export function ArabicLine({
  text,
  color,
  large = false,
}: {
  text: string;
  color: string;
  large?: boolean;
}) {
  return (
    <div className="mb-1 flex flex-wrap items-center justify-end gap-2">
      <Listen text={text} size={large ? "md" : "sm"} />
      <div className={`arabic font-bold ${large ? "arabic-hero" : "arabic-read"}`} style={{ color }}>
        {text}
      </div>
    </div>
  );
}

export function VoicedText({
  text,
  className,
  skip = [],
  as = "p",
  speak = true,
}: {
  text: string;
  className?: string;
  skip?: string[];
  as?: "p" | "span";
  speak?: boolean;
}) {
  const skipSet = new Set(skip.map((phrase) => phrase.trim()).filter(Boolean));
  const parts = splitVoiced(text);
  const Tag = as;

  return (
    <Tag className={className}>
      {parts.map((part, index) =>
        part.speak && !skipSet.has(part.speak) ? (
          <span key={index} className="mx-0.5 inline-flex items-center gap-1 align-middle">
            <span className="arabic arabic-read font-bold">{part.text}</span>
            {speak && <Listen text={part.speak} size="sm" />}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </Tag>
  );
}
