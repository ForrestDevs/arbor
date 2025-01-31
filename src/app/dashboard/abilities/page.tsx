"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface Agent {
  id: number;
  name: string;
  description: string;
  capabilities: string[];
  status: string;
}

const agents: Agent[] = [
  {
    id: 1,
    name: "General Assistant",
    description: "A general purpose AI assistant",
    capabilities: [
      "Natural Language Processing",
      "Task Management",
      "Information Retrieval",
    ],
    status: "active",
  },
  {
    id: 2,
    name: "Code Helper",
    description: "Specialized in code assistance and review",
    capabilities: ["Code Analysis", "Bug Detection", "Code Generation"],
    status: "active",
  },
  // Add more agents as needed
];

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Arbor Agents</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleAgentClick(agent)}
          >
            <h2 className="text-xl font-semibold mb-2">{agent.name}</h2>
            <p className="text-muted-foreground mb-4">{agent.description}</p>
            <div className="flex items-center">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  agent.status === "active" ? "bg-green-500" : "bg-gray-500"
                }`}
              />
              <span className="capitalize">{agent.status}</span>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedAgent && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>{selectedAgent.name}</DialogTitle>
            <div className="mt-4">
              <p className="text-muted-foreground mb-4">
                {selectedAgent.description}
              </p>
              <h3 className="font-semibold mb-2">Capabilities:</h3>
              <ul className="list-disc pl-4">
                {selectedAgent.capabilities.map((capability, index) => (
                  <li key={index} className="text-muted-foreground">
                    {capability}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    selectedAgent.status === "active"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                />
                <span className="capitalize">
                  Status: {selectedAgent.status}
                </span>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
