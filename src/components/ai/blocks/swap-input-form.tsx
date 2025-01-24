"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAI } from "@/components/ai/context";

interface SwapInputFormProps {
  message?: string;
}

export const SwapInputForm: React.FC<SwapInputFormProps> = ({
  message = "Enter token details for swap:",
}) => {
  const [formData, setFormData] = useState({
    tokenToSwap: "",
    tokenToReceive: "",
    amount: "",
  });
  const { sendClientEvent } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send the swap details back to the AI
    sendClientEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: `I want to swap ${formData.amount} of ${formData.tokenToSwap} for ${formData.tokenToReceive}`,
          },
        ],
      },
    });
    sendClientEvent({ type: "response.create" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Token Swap</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="tokenToSwap"
              className="block text-sm font-medium text-gray-700"
            >
              Token to Swap (Address)
            </label>
            <Input
              id="tokenToSwap"
              name="tokenToSwap"
              type="text"
              placeholder="Enter token address to swap"
              value={formData.tokenToSwap}
              onChange={handleChange}
              pattern="[1-9A-HJ-NP-Za-km-z]{32,44}"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="tokenToReceive"
              className="block text-sm font-medium text-gray-700"
            >
              Token to Receive (Address)
            </label>
            <Input
              id="tokenToReceive"
              name="tokenToReceive"
              type="text"
              placeholder="Enter token address to receive"
              value={formData.tokenToReceive}
              onChange={handleChange}
              pattern="[1-9A-HJ-NP-Za-km-z]{32,44}"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount to Swap
            </label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="any"
              min="0"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">
            Preview Swap
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 