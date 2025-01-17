"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useChat } from "./context";
import { cn } from "@/lib/utils";
import { IconName } from "@/lib/types";
import { Icon } from "@/components/ui/icon";

interface Props {
  icon: IconName;
  title: string;
  description: string;
  prompt: string;
  className?: string;
}

const StarterButton: React.FC<Props> = ({
  icon,
  title,
  description,
  prompt,
  className,
}) => {
  const { sendMessage } = useChat();

  return (
    <Button
      className={cn(
        "flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 h-fit justify-start",
        className
      )}
      variant="outline"
      onClick={() => sendMessage(prompt)}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Icon name={icon} className="w-4 h-4" />
          <p className="text-md font-bold">{title}</p>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 hidden md:block">
          {description}
        </p>
      </div>
    </Button>
  );
};

const starterButtons = [
  {
    title: "Trending",
    description: "Search the trending tokens",
    icon: "Coins" as const,
    prompt: "Show me the trending tokens",
  },
  {
    title: "Copy",
    description: "Find top PNL wallets",
    icon: "Coins" as const,
    prompt: "Find me the top PNL wallets",
  },
  {
    title: "Analyze",
    description: "Analyze a token price action",
    icon: "ChartCandlestick" as const,
    prompt: "Analyze this token",
  },
  {
    title: "Knowledge",
    description: "Get developer docs for protocols",
    icon: "Brain" as const,
    prompt: "Get me developer docs for Orca",
  },
] as const;

const StarterButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {starterButtons.map((button) => (
        <StarterButton key={button.title} {...button} />
      ))}
    </div>
  );
};

export default StarterButtons;
