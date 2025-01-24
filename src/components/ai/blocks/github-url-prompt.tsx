"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAI } from "@/components/ai/context";

interface GithubUrlPromptProps {
  message?: string;
}

export const GithubUrlPrompt: React.FC<GithubUrlPromptProps> = ({
  message = "Enter a GitHub repository URL to analyze:",
}) => {
  const [url, setUrl] = useState("");
  const { sendClientEvent } = useAI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send the GitHub URL back to the AI
    sendClientEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Here's the GitHub repository to analyze: ${url}`,
          },
        ],
      },
    });
    sendClientEvent({ type: "response.create" });
  };

  const validateGithubUrl = (url: string) => {
    const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+$/;
    return githubUrlPattern.test(url);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="github-url"
              className="block text-sm font-medium text-gray-700"
            >
              {message}
            </label>
            <Input
              id="github-url"
              type="url"
              placeholder="https://github.com/username/repository"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              pattern="^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+$"
              required
              className="w-full"
            />
            {url && !validateGithubUrl(url) && (
              <p className="text-sm text-red-600">
                Please enter a valid GitHub repository URL
              </p>
            )}
          </div>
          <Button type="submit" disabled={!validateGithubUrl(url)} className="w-full">
            Analyze Repository
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 