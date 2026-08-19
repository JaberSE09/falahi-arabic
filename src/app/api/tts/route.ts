import { NextRequest, NextResponse } from "next/server";

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID_AR;
const API_KEY = process.env.ELEVENLABS_API_KEY;
const MAX_TTS_CHARS = 500;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const clipped = text.trim().slice(0, MAX_TTS_CHARS);
    if (!clipped) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (!API_KEY || !VOICE_ID) {
      return NextResponse.json({ error: "TTS not configured" }, { status: 503 });
    }

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: clipped,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.8 },
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "TTS failed" }, { status: 502 });
    }

    const audio = await res.arrayBuffer();
    return new NextResponse(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
