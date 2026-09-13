import { NextRequest, NextResponse } from "next/server";

const MAX_GOOGLE_TTS_CHARS = 180;

function audioResponse(audio: ArrayBuffer) {
  return new NextResponse(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

async function elevenLabsTts(text: string): Promise<ArrayBuffer | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  const voiceId = process.env.ELEVENLABS_VOICE_ID_AR?.trim();
  if (!apiKey || !voiceId) return null;

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
      }),
    },
  );
  if (!res.ok) return null;
  const audio = await res.arrayBuffer();
  return audio.byteLength > 0 ? audio : null;
}

async function googleArabicTts(text: string): Promise<ArrayBuffer | null> {
  const clipped = text.slice(0, MAX_GOOGLE_TTS_CHARS);
  const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=ar&q=${encodeURIComponent(clipped)}`;
  const res = await fetch(url);
  const contentType = res.headers.get("content-type") ?? "";
  if (!res.ok || !contentType.includes("audio")) return null;
  const audio = await res.arrayBuffer();
  return audio.byteLength > 0 ? audio : null;
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const clipped = text.trim().slice(0, MAX_GOOGLE_TTS_CHARS);
    if (!clipped) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const elevenLabsAudio = await elevenLabsTts(clipped);
    if (elevenLabsAudio) return audioResponse(elevenLabsAudio);

    const googleAudio = await googleArabicTts(clipped);
    if (googleAudio) return audioResponse(googleAudio);

    return NextResponse.json({ error: "TTS unavailable" }, { status: 503 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
