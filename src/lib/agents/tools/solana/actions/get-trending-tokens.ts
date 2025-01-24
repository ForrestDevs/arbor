import { z } from "zod";
import { ITool, ToolResult } from "@/lib/agents/tools/types";
import { getTrendingTokens } from "@/lib/services/birdeye";

export const SOLANA_GET_TRENDING_TOKENS_NAME = "get-trending-tokens";
export const SOLANA_GET_TRENDING_TOKENS_PROMPT =
  `Use this function to get a list of trending tokens on Solana from Jupiter's API using Birdeye's trending data.
You can optionally specify a limit to control the number of tokens returned.
Example: "@get-trending-tokens" or "@get-trending-tokens limit=10"` as const;

export interface TrendingToken {
  address: string;
  symbol: string;
  name: string;
  image?: string;
  price?: number;
  change24h?: number;
}

export const GetTrendingTokensInputSchema = z.object({
  limit: z
    .number()
    .default(10)
    .describe("The number of trending tokens to return. Defaults to 10"),
});

export type GetTrendingTokensSchemaType = typeof GetTrendingTokensInputSchema;
export type GetTrendingTokensArgumentsType = z.infer<GetTrendingTokensSchemaType>;
export type GetTrendingTokensResultBodyType = {
  tokens: TrendingToken[];
};

export class SolanaGetTrendingTokensAction
  implements ITool<typeof GetTrendingTokensInputSchema, GetTrendingTokensResultBodyType>
{
  public name = SOLANA_GET_TRENDING_TOKENS_NAME;
  public description = SOLANA_GET_TRENDING_TOKENS_PROMPT;
  public argsSchema = GetTrendingTokensInputSchema;

  public async func(
    args: GetTrendingTokensArgumentsType
  ): Promise<ToolResult<any>> {
    try {
      const response = await getTrendingTokens(args.limit);

      return {
        message: `Found ${response.tokens.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
        body: {
          response,
        },
      };
    } catch (error) {
      return {
        message: `Error getting trending tokens: ${error}`,
        body: {
          tokens: [],
        },
      };
    }
  }
}
