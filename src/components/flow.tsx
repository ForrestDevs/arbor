"use client";

import { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./custom-node";
import Sidebar from "./sidebar";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeedAgent from "./agents/seed-agent";
import ChiaAgent from "./agents/chia-agent";
import CloverAgent from "./agents/clover-agent";
import AmaranthAgent from "./agents/amaranth-agent";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "seed",
    type: "custom",
    position: { x: 400, y: 300 },
    data: {
      title: "SEED",
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
    position: { x: 0, y: 0 },
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
    position: { x: 800, y: 0 },
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
    id: "e-seed-chia",
    source: "seed",
    target: "chia",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e-seed-clover",
    source: "seed",
    target: "clover",
    animated: true,
    type: "smoothstep",
  },
  {
    id: "e-seed-amaranth",
    source: "seed",
    target: "amaranth",
    animated: true,
    type: "smoothstep",
  },
];

export default function Flow() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handleBackToAllModels = () => {
    setSelectedAgent(null);
  };

  return (
    <div className="flex flex-1 overflow-hidden max-h-[92vh]">
      <div className="flex-1 bg-muted/5">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
          minZoom={0.2}
          maxZoom={1.5}
          fitView
        >
          <Controls />
          <Background color="#ddd" gap={16} />
          <MiniMap
            nodeColor={(node) => {
              switch (node.data.type) {
                case "CORE":
                  return "#22c55e";
                case "ANALYZER":
                  return "#3b82f6";
                case "CREATOR":
                  return "#f59e0b";
                case "PROCESSOR":
                  return "#ef4444";
                default:
                  return "#cbd5e1";
              }
            }}
            nodeStrokeWidth={3}
            zoomable
            pannable
            position="bottom-right"
          />
        </ReactFlow>
      </div>
      <div className="w-80 bg-card border-l border-border overflow-hidden transition-all duration-300 ease-in-out">
        {selectedAgent ? (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToAllModels}
                className="mb-4"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to all models
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {selectedAgent === "seed" && <SeedAgent />}
              {selectedAgent === "chia" && <ChiaAgent />}
              {selectedAgent === "clover" && <CloverAgent />}
              {selectedAgent === "amaranth" && <AmaranthAgent />}
            </div>
          </div>
        ) : (
          <Sidebar onAgentSelect={handleAgentSelect} />
        )}
      </div>
    </div>
  );
}
