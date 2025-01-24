"use client";

import React from "react";
import { useAI } from "@/components/ai/context";

interface TransferAgentProps {
  rationale_for_transfer: string;
  conversation_context: string;
  destination_agent: string;
}

export const TransferAgent: React.FC<TransferAgentProps> = ({
  rationale_for_transfer,
  conversation_context,
  destination_agent,
}) => {
  const { selectedAgentConfigSet } = useAI();

  // Find the destination agent's details
  const destinationAgentConfig = selectedAgentConfigSet?.find(
    (agent) => agent.name === destination_agent
  );

  return (
    <div className="p-4 mb-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-2">Transferring to: {destination_agent}</h3>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <span className="font-medium">Reason:</span> {rationale_for_transfer}
        </p>
        <p>
          <span className="font-medium">Context:</span> {conversation_context}
        </p>
        {destinationAgentConfig && (
          <p className="italic mt-2">
            {destinationAgentConfig.publicDescription}
          </p>
        )}
      </div>
    </div>
  );
};
