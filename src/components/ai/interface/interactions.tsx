"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TranscriptItem } from "@/lib/types/ai";
import Image from "next/image";
import { RenderComponent } from "./render-ai-component";
import { useAI } from "@/components/ai/context";
import { CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Interactions() {
  const { transcriptItems } = useAI();

  const interactionsRef = useRef<HTMLDivElement | null>(null);
  const [prevLogs, setPrevLogs] = useState<TranscriptItem[]>([]);
  

  function scrollToBottom() {
    if (interactionsRef.current) {
      interactionsRef.current.scrollTop = interactionsRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    const hasNewMessage = transcriptItems.length > prevLogs.length;
    const hasUpdatedMessage = transcriptItems.some((newItem, index) => {
      const oldItem = prevLogs[index];
      return (
        oldItem &&
        (newItem.title !== oldItem.title || newItem.data !== oldItem.data)
      );
    });

    if (hasNewMessage || hasUpdatedMessage) {
      scrollToBottom();
    }

    setPrevLogs(transcriptItems);
  }, [transcriptItems, prevLogs]);

  return (
    <div className="w-full h-full flex flex-col flex-1 bg-background">
      <div className="font-azeret font-semibold px-6 py-4 sticky top-0 z-10 text-base border-b bg-background">
        Interactions
      </div>
      <div className="relative flex-1 min-h-0">
        <div
          ref={interactionsRef}
          className="overflow-auto p-4 flex flex-col gap-y-4 h-full"
        >
          {transcriptItems.map((item) => {
            const {
              itemId,
              type,
              role,
              data,
              expanded,
              timestamp,
              title = "",
              isHidden,
            } = item;

            if (isHidden) {
              return null;
            }

            if (type === "UI") {
              return (
                <RenderComponent
                  component={{
                    title: item.title,
                    data: item.data,
                    id: item.itemId,
                  }}
                  key={`render-ui-${item.itemId}`}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Interactions;
