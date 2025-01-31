import React from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  NodeTypes,
  EdgeTypes,
  ConnectionMode,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { MainNode, FunctionNode, ServiceNode } from "./CustomNodes";
import CustomEdge from "./CustomEdge";

// Define node types
const nodeTypes: NodeTypes = {
  main: MainNode,
  function: FunctionNode,
  service: ServiceNode,
};

// Define edge types
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

// Initial nodes setup
const initialNodes: Node[] = [
  // Main Arbor Node
  {
    id: "arbor",
    type: "main",
    position: { x: 400, y: 0 },
    data: { label: "Arbor Copilot", icon: "/arbor2.png" },
  },

  // Function Nodes
  {
    id: "portfolio",
    type: "function",
    position: { x: 50, y: 200 },
    data: {
      label: "Portfolio Analysis",
      icon: "/icons/portfolio.svg",
      status: "online",
      description:
        "Real-time portfolio tracking and analysis with performance metrics",
      stats: [
        { label: "Accuracy", value: 99, color: "#4CAF50" },
        { label: "Speed (ms)", value: 150, color: "#2196F3" },
        { label: "Success Rate", value: 98, color: "#FF9800" },
      ],
      skills: [
        { name: "Performance Tracking", level: 95 },
        { name: "Risk Analysis", level: 90 },
        { name: "Profit/Loss Calc", level: 98 },
      ],
    },
  },
  {
    id: "trending",
    type: "function",
    position: { x: 50, y: 400 },
    data: {
      label: "Trending Tokens",
      icon: "/icons/trending.svg",
      status: "online",
      description:
        "Discover and analyze trending tokens with real-time market data",
      stats: [
        { label: "Updates/min", value: 60, color: "#4CAF50" },
        { label: "Tokens", value: 500, color: "#2196F3" },
        { label: "Accuracy", value: 97, color: "#FF9800" },
      ],
      skills: [
        { name: "Market Tracking", level: 96 },
        { name: "Volume Analysis", level: 92 },
        { name: "Trend Detection", level: 94 },
      ],
    },
  },
  {
    id: "swap",
    type: "function",
    position: { x: 362, y: 200 },
    data: {
      label: "Token Swaps",
      icon: "/icons/swap.svg",
      status: "online",
      description: "Execute token swaps with optimal routing and pricing",
      stats: [
        { label: "Success Rate", value: 99, color: "#4CAF50" },
        { label: "Avg Time", value: 200, color: "#2196F3" },
        { label: "Routes", value: 15, color: "#FF9800" },
      ],
      skills: [
        { name: "Price Optimization", level: 97 },
        { name: "Route Finding", level: 95 },
        { name: "Slippage Control", level: 93 },
      ],
    },
  },
  {
    id: "analysis",
    type: "function",
    position: { x: 362, y: 400 },
    data: {
      label: "Token Analysis",
      icon: "/icons/analysis.svg",
      status: "online",
      description: "Deep token analysis with technical and fundamental metrics",
    },
  },
  {
    id: "social",
    type: "function",
    position: { x: 650, y: 400 },

    data: {
      label: "Social Analysis",
      icon: "/icons/social.svg",
      status: "online",
      description: "Social media sentiment analysis and trend detection",
    },
  },
  {
    id: "project",
    type: "function",
    position: { x: 650, y: 200 },
    data: {
      label: "Project Analysis",
      icon: "/icons/project.svg",
      status: "online",
      description:
        "Technical analysis of blockchain projects and smart contracts",
    },
  },

  // Service Nodes
  {
    id: "birdeye",
    type: "service",
    position: { x: 50, y: 650 },
    data: { label: "Birdeye", icon: "/images/birdeyeLogo.png" },
  },
  {
    id: "dexscreener",
    type: "service",
    position: { x: 200, y: 650 },
    data: { label: "DexScreener", icon: "/images/dexLogo.png" },
  },
  {
    id: "jupiter",
    type: "service",
    position: { x: 350, y: 650 },
    data: { label: "Jupiter", icon: "/images/jupiterLogo.png" },
  },
  {
    id: "raydium",
    type: "service",
    position: { x: 500, y: 650 },
    data: { label: "Raydium", icon: "/images/raydiumLogo.jpeg" },
  },
  {
    id: "twitter",
    type: "service",
    position: { x: 650, y: 650 },
    data: { label: "Twitter", icon: "/images/XLogo.jpg" },
  },
  {
    id: "github",
    type: "service",
    position: { x: 800, y: 650 },
    data: { label: "GitHub", icon: "/images/gitLogo.png" },
  },
];

// Define edges between nodes with custom type
const initialEdges: Edge[] = [
  // Connections from Arbor to Functions
  {
    id: "arbor-portfolio",
    source: "arbor",
    target: "portfolio",
    type: "custom",
  },
  { id: "arbor-trending", source: "arbor", target: "trending", type: "custom" },
  { id: "arbor-swap", source: "arbor", target: "swap", type: "custom" },
  { id: "arbor-analysis", source: "arbor", target: "analysis", type: "custom" },
  { id: "arbor-social", source: "arbor", target: "social", type: "custom" },
  { id: "arbor-project", source: "arbor", target: "project", type: "custom" },

  // Connections from Functions to Services
  {
    id: "portfolio-birdeye",
    source: "portfolio",
    target: "birdeye",
    type: "custom",
  },
  {
    id: "trending-birdeye",
    source: "trending",
    target: "birdeye",
    type: "custom",
  },
  { id: "swap-jupiter", source: "swap", target: "jupiter", type: "custom" },
  {
    id: "analysis-dexscreener",
    source: "analysis",
    target: "dexscreener",
    type: "custom",
  },
  {
    id: "analysis-raydium",
    source: "analysis",
    target: "raydium",
    type: "custom",
  },
  { id: "social-twitter", source: "social", target: "twitter", type: "custom" },
  { id: "project-github", source: "project", target: "github", type: "custom" },
];

const ArborArchitectureGraph: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "900px" }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: "custom",
          animated: true,
        }}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ArborArchitectureGraph;
