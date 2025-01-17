"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, History } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Chat } from "@prisma/client";

import { useUserChats } from "@/lib/hooks/queries/chats";
import { useChat } from "@/app/dashboard/interface/_components/context";
import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";

export function ChatHistory() {
  const pathname = usePathname();
  const router = useRouter();

  const { ready, user } = usePrivy();

  const { chats, isLoading } = useUserChats();

  const { setChat, chatId, resetChat } = useChat();

  if (!pathname.includes("/dashboard/interface")) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
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
                  setChat(chat.id);
                }}
                className={cn(
                  "flex items-center justify-between",
                  chat.id === chatId ? "bg-muted" : ""
                )}
              >
                <span className="truncate">{chat.tagLine}</span>
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
