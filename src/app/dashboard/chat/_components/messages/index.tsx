"use client";

import React, { useEffect } from "react";

import Message from "./message";

import LoadingMessage from "./loading-message";

import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";

import { useAi } from "@/app/dashboard/chat/_components/context";

import type { Message as MessageType } from "ai";

interface Props {
  messages: MessageType[];
  messageClassName?: string;
}

const Messages: React.FC<Props> = ({ messages, messageClassName }) => {
  const { isResponseLoading } = useAi();

  const { scrollRef, messagesRef, scrollToBottom } = useScrollAnchor();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div
      className="flex-1 h-0 flex flex-col w-full overflow-y-auto max-w-full no-scrollbar"
      ref={scrollRef}
    >
      <div className="messages-container" ref={messagesRef}>
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            className={messageClassName}
            previousMessage={index > 0 ? messages[index - 1] : undefined}
            nextMessage={
              index < messages.length - 1 ? messages[index + 1] : undefined
            }
          />
        ))}
        {isResponseLoading && <LoadingMessage />}
      </div>
    </div>
  );
};

export default Messages;
