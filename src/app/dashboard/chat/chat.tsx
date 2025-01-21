"use client";

import EmptyChat from "./_components/empty";
import ChatInput from "./_components/input";
import Messages from "./_components/messages";
import { useAi } from "@/app/dashboard/chat/_components/context";

export function ChatInterface() {
  const { messages } = useAi();

  const cleanedMessages = messages.filter(
    (message) => message.role !== "system"
  );

  return (
    <div className="h-full w-full flex flex-col items-center relative">
      <div className="h-full w-full flex flex-col justify-between max-w-full md:max-w-4xl">
        <div className="flex-1 overflow-hidden h-0 flex flex-col max-w-full">
          {cleanedMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <EmptyChat />
            </div>
          ) : (
            <>
              <Messages messages={cleanedMessages} />
              <ChatInput />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
