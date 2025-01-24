"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAI } from "@/components/ai/context";

interface TokenInputPromptProps {
  message?: string;
}

export const TokenInputPrompt: React.FC<TokenInputPromptProps> = ({
  message = "Please enter a Solana token address to analyze:",
}) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const { sendClientEvent } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send the token address back to the AI
    sendClientEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Here's the token address to analyze: ${tokenAddress}`,
          },
        ],
      },
    });
    sendClientEvent({ type: "response.create" });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="token-address"
              className="block text-sm font-medium text-gray-700"
            >
              {message}
            </label>
            <Input
              id="token-address"
              type="text"
              placeholder="Enter Solana token address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            //   pattern="[1-9A-HJ-NP-Za-km-z]{32,44}"
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Analyze Token
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 