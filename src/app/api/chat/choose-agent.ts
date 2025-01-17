import { z } from "zod";

import { generateObject, Message } from "ai";
import { agents } from "@/lib/agents";
import { Agent } from "@/lib/agents/type";
import { openai } from "@ai-sdk/openai";

export const system = `You are the orchestrator of a swarm of blockchain agents that each have specialized tasks.

Given this list of agents and their capabilities, choose the one that is most appropriate for the user's request.

${agents.map((agent) => `${agent.name}: ${agent.systemPrompt}`).join("\n")}`;

export const chooseAgent = async (
  messages: Message[]
): Promise<Agent | null> => {
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      agent: z.enum(agents.map((agent) => agent.name) as [string, ...string[]]),
    }),
    messages,
    system,
  });

  return agents.find((agent) => agent.name === object.agent) ?? null;
};
