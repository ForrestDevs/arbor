"use client";

import React, { useEffect } from "react";
import { Conversation } from "@/lib/types/conversation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import ThreeDotsWave from "../ui/three-dots-wave";
// import { ThreeDotsWave } from "@/components/ui/three-dots-wave";

/**
 * Decide if a conversation item should be displayed or filtered out.
 * Optional, this is used to filter out empty or useless user messages (e.g., final + empty text)
 */
function shouldDisplayMessage(msg: Conversation): boolean {
  const { role, text, status, isFinal } = msg;

  if (role === "assistant") {
    // Always display assistant messages (even if they're empty, though that’s rare).
    return true;
  } else {
    // User role
    // 1) If user is currently speaking or processing, we show it (wave or “Processing…”).
    if (status === "speaking" || status === "processing") {
      return true;
    }
    // 2) If user is final, only show if the transcript is non-empty.
    if (isFinal && text.trim().length > 0) {
      return true;
    }
    // Otherwise, skip.
    return false;
  }
}

/**
 * Single conversation item
 */
function ConversationItem({ message }: { message: Conversation }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";
  const msgStatus = message.status;

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}
    >
      {/* Assistant Avatar */}
      {isAssistant && (
        <Avatar className="w-8 h-8 shrink-0">
          {/* <AvatarImage src="/placeholder-user.jpg" /> */}
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      {/* Message Bubble */}
      <div
        className={`${
          isUser
            ? "bg-primary text-background"
            : "bg-secondary dark:text-foreground"
        } px-4 py-2 rounded-lg max-w-[70%] motion-preset-slide-up-right`}
      >
        {(isUser && msgStatus === "speaking") || msgStatus === "processing" ? (
          // Show wave animation for "speaking" status
          <ThreeDotsWave />
        ) : (
          // Otherwise, show the message text or final text)
          <p>{message.text}</p>
        )}

        {/* Timestamp below */}
        <div className="text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <Avatar className="w-8 h-8 shrink-0">
          {/* <AvatarImage src="/placeholder-user.jpg" /> */}
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}

interface TranscriberProps {
  conversation: Conversation[];
}

export default function Transcriber({ conversation }: TranscriberProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever conversation updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  // Filter out messages that we do not want to display
  const displayableMessages = React.useMemo(() => {
    return conversation.filter(shouldDisplayMessage);
  }, [conversation]);

  return (
    <div className="flex flex-col w-full h-full mx-auto bg-background rounded-lg shadow-lg overflow-hidden dark:bg-background">
      <div
        ref={scrollRef}
        className="flex-1 h-full overflow-y-auto p-4 space-y-4 z-50 scrollbar-thin scrollbar-thumb-primary"
      >
        <AnimatePresence>
          {displayableMessages.map((message) => (
            <ConversationItem key={message.id} message={message} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
