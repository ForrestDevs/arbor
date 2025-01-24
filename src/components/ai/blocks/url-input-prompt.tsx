"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAI } from "@/components/ai/context";

interface UrlInputPromptProps {
  message?: string;
}

export const UrlInputPrompt: React.FC<UrlInputPromptProps> = ({
  message = "Enter a URL to open:",
}) => {
  const [url, setUrl] = useState("");
  const { sendClientEvent } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send the URL back to the AI
    sendClientEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Please open this URL: ${url}`,
          },
        ],
      },
    });
    sendClientEvent({ type: "response.create" });
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="web-url"
              className="block text-sm font-medium text-gray-700"
            >
              {message}
            </label>
            <Input
              id="web-url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full"
            />
            {url && !validateUrl(url) && (
              <p className="text-sm text-red-600">
                Please enter a valid URL
              </p>
            )}
          </div>
          <Button type="submit" disabled={!validateUrl(url)} className="w-full">
            Open URL
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 