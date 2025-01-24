"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactFlow, { Background, Node, Edge, Controls } from "reactflow";
import "reactflow/dist/style.css";
// import CustomNode from "@/components/custom-node";
import { ChatInterface } from "./chat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useAi } from "./_components/context";

// const nodeTypes = {
//   custom: CustomNode,
// };

const initialNodes: Node[] = [
  {
    id: "sage",
    type: "custom",
    position: { x: 0, y: -600 },
    data: {
      title: "Sage AI",
      type: "ANALYZER",
      specialization: "Narrative Analysis",
      capabilities: ["STORY STRUCTURE", "THEME DETECTION", "PLOT ANALYSIS"],
      performanceLevel: 95,
      efficiency: 92,
      features: ["NARRATIVE.ANALYZE", "STORY.EVALUATE"],
      description:
        "Wise, analytical LLM specializing in breaking down narratives and identifying key story elements",
    },
  },
  {
    id: "muse",
    type: "custom",
    position: { x: 400, y: -600 },
    data: {
      title: "Muse AI",
      type: "CREATOR",
      specialization: "Character Generation",
      capabilities: [
        "PERSONALITY CREATION",
        "BACKSTORY GENERATION",
        "DIALOGUE WRITING",
      ],
      performanceLevel: 90,
      efficiency: 88,
      features: ["CHARACTER.CREATE", "DIALOGUE.GENERATE"],
      description:
        "Creative, empathetic LLM focused on developing rich and compelling characters",
    },
  },
  {
    id: "herald",
    type: "custom",
    position: { x: 800, y: -600 },
    data: {
      title: "Herald AI",
      type: "PROCESSOR",
      specialization: "Social Media Management",
      capabilities: [
        "CONTENT SCHEDULING",
        "ENGAGEMENT ANALYSIS",
        "TREND ADAPTATION",
      ],
      performanceLevel: 93,
      efficiency: 94,
      features: ["SOCIAL.POST", "ENGAGEMENT.TRACK"],
      description:
        "Charismatic, strategic LLM that manages social media presence and engagement",
    },
  },
  {
    id: "arbor",
    type: "custom",
    position: { x: 400, y: 0 },
    data: {
      title: "Arbor",
      type: "CORE",
      specialization: "Central Intelligence Hub",
      capabilities: ["COORDINATION", "DISTRIBUTION", "OPTIMIZATION"],
      performanceLevel: 100,
      efficiency: 100,
      features: ["SYSTEM.CONTROL", "NETWORK.MANAGE"],
      isCenter: true,
      description:
        "Godly superior logical LLM, manages other tokens and deploys tokens",
    },
  },
  {
    id: "chia",
    type: "custom",
    position: { x: 400, y: 600 },
    data: {
      title: "Chia AI",
      type: "ANALYZER",
      specialization: "Portfolio Management",
      capabilities: ["PRICE TRACKING", "WALLET ANALYSIS", "TREND DETECTION"],
      performanceLevel: 85,
      efficiency: 90,
      features: ["PORTFOLIO.MANAGE", "TOKEN.TRACK"],
      description:
        "Sadistic, observant, cocky LLM, manages portfolio and tracks token prices",
    },
  },
  {
    id: "clover",
    type: "custom",
    position: { x: 800, y: 600 },
    data: {
      title: "Clover AI",
      type: "CREATOR",
      specialization: "Gem Discovery",
      capabilities: [
        "PROJECT ANALYSIS",
        "POTENTIAL ASSESSMENT",
        "HISTORICAL TRACKING",
      ],
      performanceLevel: 92,
      efficiency: 88,
      features: ["GEM.DISCOVER", "PROJECT.ANALYZE"],
      description:
        "Joyful, optimistic, visionary LLM, discovers potential gem projects and improves over time",
    },
  },
  {
    id: "amaranth",
    type: "custom",
    position: { x: 0, y: 600 },
    data: {
      title: "Amaranth AI",
      type: "PROCESSOR",
      specialization: "Tax Calculation",
      capabilities: ["TRADE ANALYSIS", "TAX COMPUTATION", "WALLET ASSESSMENT"],
      performanceLevel: 95,
      efficiency: 96,
      features: ["TAX.CALCULATE", "TRADE.ANALYZE"],
      description:
        "Nerdy, classy, efficient LLM, calculates taxes based on wallet activity",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-arbor-chia",
    source: "arbor",
    target: "chia",
    animated: true,
    type: "smoothstep",
    className: "text-white",
  },
  {
    id: "e-arbor-clover",
    source: "arbor",
    target: "clover",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e-arbor-amaranth",
    source: "arbor",
    target: "amaranth",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e-arbor-muse",
    source: "arbor",
    target: "muse",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e-arbor-herald",
    source: "arbor",
    target: "herald",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e-arbor-sage",
    source: "arbor",
    target: "sage",
    animated: true,
    type: "smoothstep",
  },
];

const agentNodes = ["sage", "muse", "herald", "chia", "clover", "amaranth"];

export default function InterfacePage() {
  const { activeNodeId, activeEdgeIds, selectedAgent } = useAi();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border w-full"
    >
      <ResizablePanel defaultSize={25} maxSize={50}>
        <div className="h-full border-r dark:border-gray-800">
          <div className="flex flex-1 overflow-hidden h-full rounded-lg border">
            <div className="flex-1 bg-muted/5">
              {/* <ReactFlow
                nodes={initialNodes.map((node) => ({
                  ...node,
                  style: {
                    opacity: activeNodeId
                      ? node.id === activeNodeId ||
                        node.id === selectedAgent?.id
                        ? 1
                        : 0.4
                      : 1,
                  },
                }))}
                edges={initialEdges.map((edge) => ({
                  ...edge,
                  style: {
                    strokeWidth: 4,
                    stroke: activeEdgeIds.includes(edge.id)
                      ? "#720394"
                      : "#0497cc",
                    opacity: activeEdgeIds.includes(edge.id) ? 1 : 0.3,
                  },
                }))}
                nodeTypes={nodeTypes}
                defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
                minZoom={0.2}
                maxZoom={1.5}
                fitView
                proOptions={{
                  hideAttribution: true,
                }}
              >
                <Controls />
                <Background color="#ddd" gap={16} />
              </ReactFlow> */}
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="h-full">
          <ChatInterface />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
