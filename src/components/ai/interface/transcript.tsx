"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TranscriptItem } from "@/lib/types/ai";
import Image from "next/image";
import { RenderComponent } from "./render-ai-component";
import { useAI } from "@/components/ai/context";
import { CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Transcript() {
  const {
    userText,
    setUserText,
    handleSendTextMessage,
    sessionStatus,
    dcRef,
    transcriptItems,
    toggleTranscriptItemExpand,
  } = useAI();

  const canSend =
    sessionStatus === "CONNECTED" && dcRef.current?.readyState === "open";

  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const [prevLogs, setPrevLogs] = useState<TranscriptItem[]>([]);
  const [justCopied, setJustCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function scrollToBottom() {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
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

  // Autofocus on text box input on load
  useEffect(() => {
    if (canSend && inputRef.current) {
      inputRef.current.focus();
    }
  }, [canSend]);

  const handleCopyTranscript = async () => {
    if (!transcriptRef.current) return;
    try {
      await navigator.clipboard.writeText(transcriptRef.current.innerText);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy transcript:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col flex-1 bg-background">
      <div className="font-azeret font-semibold px-6 py-4 sticky top-0 z-10 text-base border-b bg-background">
        Transcript
      </div>
      <div className="relative flex-1 min-h-0">
        <div
          ref={transcriptRef}
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

            if (type === "MESSAGE") {
              const isUser = role === "user";
              const baseContainer = "flex justify-end flex-col";
              const containerClasses = `${baseContainer} ${
                isUser ? "items-end" : "items-start"
              }`;
              const bubbleBase = `max-w-lg p-3 rounded-xl ${
                isUser
                  ? "bg-neutral-900/80 dark:bg-neutral-800 text-gray-100"
                  : "bg-neutral-100 dark:bg-neutral-900 text-black dark:text-gray-100"
              }`;
              const isBracketedMessage =
                title.startsWith("[") && title.endsWith("]");
              const messageStyle = isBracketedMessage
                ? "italic text-gray-400 dark:text-gray-200"
                : "";
              const displayTitle = isBracketedMessage
                ? title.slice(1, -1)
                : title;

              return (
                <div key={itemId} className={containerClasses}>
                  <div className={bubbleBase}>
                    <div
                      className={
                        "text-xs font-mono text-gray-500 dark:text-gray-400"
                      }
                    >
                      {timestamp}
                    </div>
                    <div className={`whitespace-pre-wrap ${messageStyle}`}>
                      <ReactMarkdown>{displayTitle}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            } else if (type === "BREADCRUMB") {
              return (
                <div
                  key={itemId}
                  className="flex flex-col justify-start items-start text-gray-500 dark:text-gray-400 text-sm"
                >
                  <span className="text-xs font-mono">{timestamp}</span>
                  <div
                    className={`whitespace-pre-wrap flex items-center font-mono text-sm text-gray-800 dark:text-gray-200 ${
                      data ? "cursor-pointer" : ""
                    }`}
                    onClick={() => data && toggleTranscriptItemExpand(itemId)}
                  >
                    {data && (
                      <span
                        className={`text-gray-400 dark:text-gray-200 mr-1 transform transition-transform duration-200 select-none font-mono ${
                          expanded ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        ▶
                      </span>
                    )}
                    {title}
                  </div>
                  {expanded && data && (
                    <div className="text-gray-800 dark:text-gray-200 text-left">
                      <pre className="border-l-2 ml-1 border-gray-200 dark:border-gray-800 whitespace-pre-wrap break-words font-mono text-xs mb-2 mt-2 pl-2">
                        {JSON.stringify(data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            } else {
              // Fallback if type is neither MESSAGE nor BREADCRUMB
              return null;
            }
          })}
        </div>
      </div>

      <div className="p-4 flex items-center gap-x-2 flex-shrink-0 border-t bg-background">
        <input
          ref={inputRef}
          type="text"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canSend) {
              handleSendTextMessage();
            }
          }}
          className="flex-1 px-4 py-2 focus:outline-none bg-background z-10"
          placeholder="Type a message..."
        />
        <Button
          onClick={handleSendTextMessage}
          disabled={!canSend || !userText.trim()}
          className="px-2 py-2 disabled:opacity-50 bg-muted"
        >
          <CornerDownRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </Button>
      </div>
    </div>
  );
}

export default Transcript;
