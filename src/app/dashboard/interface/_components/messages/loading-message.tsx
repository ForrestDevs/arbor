"use client";

import React from "react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import Image from "next/image";

import { cn } from "@/lib/utils";

const LoadingMessage: React.FC = () => {
  return (
    <div
      className={cn(
        // base styles
        "flex w-full px-2 py-4 max-w-full last:border-b-0",
        // mobile styles
        "flex-col gap-2",
        // desktop styles
        "md:flex-row md:gap-4 md:px-4"
      )}
    >
      <div className="flex items-center md:items-start gap-2">
        <Image src="/arbor.png" alt="logo" width={100} height={100} />
      </div>
      <div className="md:pt-2 w-full max-w-full md:flex-1 md:w-0 overflow-hidden flex flex-col gap-2 items-start">
        <AnimatedShinyText
          className="text-sm font-semibold text-left mx-0 w-fit"
          shimmerWidth={70}
        >
          Thinking...
        </AnimatedShinyText>
      </div>
    </div>
  );
};

export default LoadingMessage;
