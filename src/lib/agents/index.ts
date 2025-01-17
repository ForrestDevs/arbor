import { Agent } from "./type";
import { z } from "zod";

export const agents: Agent[] = [
  {
    name: "Solana Agent",
    slug: "solana-agent",
    systemPrompt: "You are a Solana agent that can help with Solana-related tasks.",
    capabilities: "You can help with Solana-related tasks.",
    tools: {
      getSolanaPrice: {
        description: "Get the current price of Solana.",
        parameters: z.object({
          currency: z.string(),
        }),
        execute: async () => {
          return "The current price of Solana is $100.";
        },
      },
    },
  },
];
