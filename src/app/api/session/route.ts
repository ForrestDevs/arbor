import { NextResponse } from "next/server";

export async function POST() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(`OPENAI_API_KEY is not set`);
    }
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-realtime-preview-2024-12-17",
          voice: "echo",
          modalities: ["audio", "text"],
          input_audio_transcription: {
            model: "whisper-1",
          },
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          turn_detection: null,
          temperature: 0.6,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching session data:", error);
    return NextResponse.json(
      { error: "Failed to fetch session data" },
      { status: 500 }
    );
  }
}
