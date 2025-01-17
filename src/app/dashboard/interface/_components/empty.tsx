"use client";

import React from "react";
import ChatInput from "./input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import StarterButtons from "./starter-buttons";

const EmptyChat: React.FC = () => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full px-4"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4 md:gap-8">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Image src="/arbor.png" alt="logo" width={100} height={100} />
          <div className="flex flex-col gap-1">
            <h1 className="font-azeret font-semibold text-center text-2xl">
              How can{" "}
              <span className="font-vt323 font-bold inline text-4xl">
                Arbor
              </span>{" "}
              help you?
            </h1>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              Orchestrate a network of specialized agents to act on and off
              chain
            </p>
          </div>
        </div>
        <ChatInput />
        <StarterButtons />
      </div>
    </div>
  );
};

export default EmptyChat;
