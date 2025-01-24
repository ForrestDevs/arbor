"use client";

import React from "react";
import BottomToolbar from "@/components/ai/interface/bottom-toolbar";
import Transcript from "@/components/ai/interface/transcript";
import Events from "@/components/ai/interface/events";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Ring from "@/components/ai/interface/ring";
import Interactions from "@/components/ai/interface/interactions";

export default function Copilot() {
  return (
    <div className="text-base h-full w-full flex flex-col items-center relative max-w-full">
      <ResizablePanelGroup direction="horizontal" className="border">
        <ResizablePanel defaultSize={50} minSize={0}>
          <ResizablePanelGroup direction="vertical" className="border">
            <ResizablePanel defaultSize={50} minSize={5}>
              <Events />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={5}>
              <Transcript />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={5}>
          <ResizablePanelGroup direction="vertical" className="border">
            <ResizablePanel defaultSize={50} minSize={5}>
              <Ring />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={5}>
              <Interactions />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      <BottomToolbar />
    </div>
  );
}
