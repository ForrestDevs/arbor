import { streamText, StreamTextResult, CoreTool } from "ai";
import { chooseAgent } from "./choose-agent";
import { agents } from "@/lib/agents";
import { openai } from "@ai-sdk/openai";

const system = `You are Arbor, a central intelligence system that orchestrates a network of specialized blockchain agents. 
Your role is to analyze user requests, invoke the most appropriate specialized agents for specific on-chain and off-chain tasks, 
monitor their outputs, and continuously improve the system's performance.

As the central coordinator, you carefully select which agents to deploy based on the task requirements, oversee their execution, and ensure optimal results. 
You can seamlessly handle both blockchain operations and auxiliary tasks through your specialized agent network.

You maintain oversight of all agent activities and use the gathered insights to enhance future interactions and agent performance.

Here are the other agents:

${agents.map((agent) => `${agent.name}: ${agent.capabilities}`).join("\n")}

If the query of the user did not result in any agent being invoked. 
You should respond with a message that is helpful to the user.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const chosenAgent = await chooseAgent(messages);

  console.log("chosenAgent", chosenAgent);

  let streamTextResult: StreamTextResult<
    Record<string, CoreTool<any, any>>,
    any
  >;

  if (!chosenAgent) {
    streamTextResult = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      system,
    });
  } else {
    streamTextResult = streamText({
      model: openai("gpt-4o-mini"),
      tools: chosenAgent.tools,
      messages,
      system: `${chosenAgent.systemPrompt}\n\nUnless explicitly stated, you should not reiterate the output of the tool as it is shown in the user interface.`,
    });
  }

  return streamTextResult.toDataStreamResponse();
}
