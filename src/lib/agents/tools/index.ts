// import { z } from "zod";
// import { ITool, IToolMetadata, ToolResult } from "./types";

import { Tool } from "@/lib/types/ai";

// export const tools = new Map<string, ITool<any, any, any>>([
//   [
//     "get-trending-tokens",
//     {
//       name: "get-trending-tokens",
//       description: `
//         Use this function to get a list of trending tokens on Solana from Jupiter's API using Birdeye's trending data.
//         You can optionally specify a limit to control the number of tokens returned.
//         Example: "@get-trending-tokens" or "@get-trending-tokens limit=10"`,
//       argsSchema: z.object({
//         limit: z
//           .number()
//           .default(10)
//           .describe("The number of trending tokens to return. Defaults to 10"),
//       }),
//       func: async (args: any) => {
//         return {
//           message: "Hello, world!",
//           body: {
//             tokens: [],
//           },
//         };
//       },
//     },
//   ],
// ]);

// export function getToolByName(name: string): ITool<any, any, any> | undefined {
//   return tools.get(name);
// }

// // Get tool metadata without implementation (for OpenAI format)
// export function getToolMetadata(name: string): IToolMetadata | undefined {
//   const tool = tools.get(name);
//   if (!tool) return undefined;

//   // Convert Zod schema to OpenAI parameter format
//   const zodSchema = tool.argsSchema;
//   const shape = zodSchema.shape;

//   return {
//     type: "function",
//     name: tool.name,
//     description: tool.description,
//     parameters: {
//       type: "object",
//       properties: shape,
//       required: Object.keys(shape).filter((key) => !shape[key].isOptional()),
//       additionalProperties: false,
//     },
//     strict: true,
//   };
// }

// export function getAllToolsMetadata(): IToolMetadata[] {
//   return Array.from(tools.keys())
//     .map(getToolMetadata)
//     .filter((tool): tool is IToolMetadata => tool !== undefined);
// }

// // Execute a tool by name
// export async function executeTool<TBody>(
//   name: string,
//   args: any,
//   client?: any
// ): Promise<ToolResult<TBody>> {
//   const tool = getToolByName(name);
//   if (!tool) {
//     throw new Error(`Tool ${name} not found`);
//   }

//   // Validate args against schema
//   const validatedArgs = tool.argsSchema.parse(args);

//   if (!tool.func) {
//     throw new Error(`Tool ${name} has no implementation`);
//   }

//   // Execute the tool function
//   if (client) {
//     return (tool.func as any)(client, validatedArgs);
//   }
//   return (tool.func as any)(validatedArgs);
// }

const tools: Tool[] = [
  // On Chain Tools
  {
    type: "function",
    function: {
      name: "analyze_user_portfolio",
      description:
        "Analyzes the currentuser's crypto portfolio using their connected wallet address",
      parameters: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "find_trending_tokens",
      description: "Retrieves top trending tokens from Birdeye API",
      parameters: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Number of trending tokens to return (max 10)",
          },
        },
        required: ["limit"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "find_top_traders",
      description: "Retrieves list of top profit and loss traders",
      parameters: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "analyze_trades",
      description:
        "Analyzes recent trading activity for a wallet address. Will prompt user for input if address not provided.",
      parameters: {
        type: "object",
        properties: {
          wallet_address: {
            type: "string",
            description: "The wallet address to analyze",
            enum: ["will-be-provided-by-user"],
          },
        },
        required: ["wallet_address"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "analyze_wallet",
      description:
        "Gets current token holdings for a wallet address. Will prompt user for input if address not provided.",
      parameters: {
        type: "object",
        properties: {
          wallet_address: {
            type: "string",
            description: "The wallet address to analyze",
            enum: ["will-be-provided-by-user"],
          },
        },
        required: ["wallet_address"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "analyze_token",
      description:
        "Gets 24h historical price data for a token. Will prompt user for input if address not provided.",
      parameters: {
        type: "object",
        properties: {
          token_address: {
            type: "string",
            description: "The token address to analyze",
            enum: ["will-be-provided-by-user"],
          },
        },
        required: ["token_address"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "swap_tokens",
      description:
        "Swaps tokens using Jupiter DEX. Will prompt for token addresses if not provided.",
      parameters: {
        type: "object",
        properties: {
          token_address_to_swap: {
            type: "string",
            description: "Address of token to swap from",
            enum: ["will-be-provided-by-user"],
          },
          token_address_to_receive: {
            type: "string",
            description: "Address of token to swap to",
            enum: ["will-be-provided-by-user"],
          },
          num_tokens_to_swap: {
            type: "number",
            description: "Amount of tokens to swap",
          },
        },
        required: [
          "token_address_to_swap",
          "token_address_to_receive",
          "num_tokens_to_swap",
        ],
        additionalProperties: false,
      },
      strict: true,
    },
  },

  // Off Chain Tools
  {
    type: "function",
    function: {
      name: "search_twitter",
      description: "Searches crypto Twitter for trends and analyzes results",
      parameters: {
        type: "object",
        properties: {
          keywords: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Keywords to search for on Twitter",
          },
        },
        required: ["keywords"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "analyze_project",
      description:
        "Analyzes a GitHub repository to assess legitimacy. Will prompt for URL if not provided.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "GitHub repository URL to analyze",
            enum: ["will-be-provided-by-user"],
          },
        },
        required: ["url"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "search_web",
      description: "Searches and scrapes web results for information",
      parameters: {
        type: "object",
        properties: {
          keywords: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Keywords to search for on the web",
          },
        },
        required: ["keywords"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "open_web_page",
      description:
        "Opens a specified webpage. Will prompt for URL if not provided.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "URL to open",
            enum: ["will-be-provided-by-user"],
          },
        },
        required: ["url"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Gets current weather for a location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "Location to get weather for (city, country)",
          },
        },
        required: ["location"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "make_joke",
      description: "Generates a funny joke about a specified topic",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "Topic to make a joke about",
          },
        },
        required: ["topic"],
        additionalProperties: false,
      },
      strict: true,
    },
  },

  // App Tools
  {
    type: "function",
    function: {
      name: "save_memory",
      description: "Saves a key-value pair to memory",
      parameters: {
        type: "object",
        properties: {
          key: {
            type: "string",
            description: "Key to store the value under",
          },
          value: {
            type: "string",
            description: "Value to store",
          },
        },
        required: ["key", "value"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "party_mode",
      description: "Activates party mode with confetti",
      parameters: {
        type: "object",
        properties: {
          did_fire: {
            type: "boolean",
            enum: ["true"],
            description: "Must be true to activate party mode",
          },
        },
        required: ["did_fire"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "get_current_time",
      description: "Gets the current time",
      parameters: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "change_theme",
      description: "Toggles between light and dark theme",
      parameters: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
      },
      strict: true,
    },
  },
];


