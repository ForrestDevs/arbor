"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, History, Trash2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Chat } from "@prisma/client";

import { useUserChats } from "@/lib/hooks/queries/chats";
import { useAi } from "@/app/dashboard/chat/_components/context";
import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useAI } from "../ai/context";
import { deleteChat } from "@/lib/db/services/chats";

export function ChatHistory() {
  const pathname = usePathname();
  const router = useRouter();

  const { ready, user } = usePrivy();

  const { chats, isLoading } = useUserChats();

  // const { setChat, chatId, resetChat } = useAi();

  const { setChat, resetChat, chatId, disconnectFromRealtime } = useAI();

  if (!pathname.includes("/dashboard/copilot")) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          disconnectFromRealtime();
          resetChat();
        }}
      >
        <Plus className="h-4 w-4 mr-2" />
        New Chat
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isLoading || !ready ? (
            <Skeleton className="h-10 w-full" />
          ) : chats.length > 0 ? (
            chats.map((chat: Chat) => (
              <DropdownMenuItem
                key={chat.id}
                onClick={() => {
                  disconnectFromRealtime();
                  setChat(chat.id);
                }}
                className={cn(
                  "flex items-center justify-between gap-2",
                  chat.id === chatId ? "bg-muted" : ""
                )}
              >
                <span className="truncate">{chat.tagLine}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={async (e) => {
                    e.stopPropagation();
                    // TODO: Add delete chat functionality
                    await deleteChat(chat.id, user?.id ?? "");
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DropdownMenuItem>
            ))
          ) : user ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 pl-2">
              No chats found
            </p>
          ) : (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 pl-2">
              Sign in to view your chats
            </p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
