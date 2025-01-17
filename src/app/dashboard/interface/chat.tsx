"use client";

import { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyChat from "./_components/empty";
import ChatInput from "./_components/input";
import Messages from "./_components/messages";
import { useChat } from "@/app/dashboard/interface/_components/context";

interface ChatInterfaceProps {
  selectedAgent:
    | {
        id: string;
        reason: string;
      }
    | null
    | undefined;
  initialNodes: any[];
}

export function ChatInterface({
  selectedAgent,
  initialNodes,
}: ChatInterfaceProps) {
  const { messages } = useChat();

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
    // <div className="w-full h-full flex flex-col p-6">
    //   <div className="flex items-center gap-2 mb-6">
    //     <MessageSquare className="w-6 h-6" />
    //     <h1 className="text-2xl font-bold">AI Chat Interface</h1>
    //   </div>

    //   {selectedAgent && (
    //     <div className="mb-4 p-4 bg-muted rounded-lg">
    //       <p className="font-semibold">
    //         Active Agent:{" "}
    //         {
    //           initialNodes.find((node) => node.id === selectedAgent.id)?.data
    //             .title
    //         }
    //       </p>
    //       <p className="text-sm text-muted-foreground">
    //         {selectedAgent.reason}
    //       </p>
    //     </div>
    //   )}

    //   <div className="flex-1 overflow-y-auto space-y-4 mb-4">
    //     {messages.map((message, index) => (
    //       <div
    //         key={index}
    //         className={cn(
    //           "flex",
    //           message.role === "user" ? "justify-end" : "justify-start"
    //         )}
    //       >
    //         <div
    //           className={cn(
    //             "max-w-[80%] rounded-lg p-4",
    //             message.role === "user"
    //               ? "bg-primary text-primary-foreground"
    //               : "bg-muted"
    //           )}
    //         >
    //           {message.content}
    //         </div>
    //       </div>
    //     ))}
    //     {isLoading && (
    //       <div className="flex justify-start">
    //         <div className="bg-muted rounded-lg p-4">Thinking...</div>
    //       </div>
    //     )}
    //     <div ref={messagesEndRef} />
    //   </div>

    //   <form onSubmit={handleSubmit} className="flex gap-2">
    //     <Input
    //       value={input}
    //       onChange={handleInputChange}
    //       placeholder="Type your message..."
    //       disabled={isLoading}
    //       className="flex-1"
    //     />
    //     <Button type="submit" disabled={isLoading}>
    //       <Send className="w-4 h-4" />
    //     </Button>
    //   </form>
    // </div>
  );
}
