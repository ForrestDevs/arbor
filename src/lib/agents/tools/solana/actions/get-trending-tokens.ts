import { z } from "zod";
import { SolanaAction, SolanaActionResult } from "@/lib/ai";

export const SOLANA_GET_TRENDING_TOKENS_NAME = "get-trending-tokens";
export const SOLANA_GET_TRENDING_TOKENS_PROMPT =
  `Use this function to get a list of trending tokens on Solana from Jupiter's API using Birdeye's trending data.
You can optionally specify a limit to control the number of tokens returned.
Example: "@get-trending-tokens" or "@get-trending-tokens limit=10"` as const;

export class SolanaGetTrendingTokensAction
  implements
    SolanaAction<
      typeof GetTrendingTokensInputSchema,
      GetTrendingTokensResultBodyType
    >
{
  public name = SOLANA_GET_TRENDING_TOKENS_NAME;
  public description = SOLANA_GET_TRENDING_TOKENS_PROMPT;
  public argsSchema = GetTrendingTokensInputSchema;
  public func = getTrendingTokens;
}

export type GetTrendingTokensSchemaType = typeof GetTrendingTokensInputSchema;

export type GetTrendingTokensArgumentsType =
  z.infer<GetTrendingTokensSchemaType>;

export type GetTrendingTokensResultBodyType = {
  tokens: TrendingToken[];
};

export type GetTrendingTokensResultType =
  SolanaActionResult<GetTrendingTokensResultBodyType>;

export const GetTrendingTokensInputSchema = z.object({
  limit: z
    .number()
    .default(10)
    .describe("The number of trending tokens to return. Defaults to 10"),
});

/**
 * Gets the trending tokens from Birdeye API.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the trending tokens information
 */
export async function getTrendingTokens(
  args: GetTrendingTokensArgumentsType
): Promise<SolanaActionResult<GetTrendingTokensResultBodyType>> {
  try {
    const response = await getTrendingTokensBirdeye(0, args.limit);

    return {
      message: `Found ${response.tokens.length} trending tokens. The user is shown the tokens, do not list them. Ask the user what they want to do with the coin.`,
      body: {
        tokens: response.tokens,
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
