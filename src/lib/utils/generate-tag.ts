"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { TranscriptItem } from "../types/ai";

export const generateTagLine = async (transcriptItems: TranscriptItem[]) => {
  const messages = transcriptItems
    .slice(0, 6)
    .filter((item) => item.role === "user" || item.role === "assistant")
    .map((item) => ({
      role: item.role ?? "user",
      content: item.title ?? "",
    }));

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    messages: [
      ...messages,
      {
        role: "user",
        content:
          "Generate a 3-5 word description of the chat. Do not include any quotation marks or other punctuation.",
      },
    ],
  });

  return text;
};
