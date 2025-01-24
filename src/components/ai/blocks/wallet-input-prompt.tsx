"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAI } from "@/components/ai/context";

interface WalletInputPromptProps {
  message?: string;
}

export const WalletInputPrompt: React.FC<WalletInputPromptProps> = ({
  message = "Please enter a Solana wallet address to analyze:",
}) => {
  const [walletAddress, setWalletAddress] = useState("");
  const { sendClientEvent } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send the wallet address back to the AI
    sendClientEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Here's the wallet address to analyze: ${walletAddress}`,
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
              htmlFor="wallet-address"
              className="block text-sm font-medium text-gray-700"
            >
              {message}
            </label>
            <Input
              id="wallet-address"
              type="text"
              placeholder="Enter Solana wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              pattern="[1-9A-HJ-NP-Za-km-z]{32,44}"
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Analyze Wallet
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 