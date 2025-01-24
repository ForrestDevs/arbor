import { queryBirdeye } from "./base";

export interface TrendingToken {
  address: string;
  decimals: number;
  liquidity: number;
  logoURI: string;
  name: string;
  symbol: string;
  volume24hUSD: number;
  rank: number;
  price: number;
  price24hChangePercent: number;
}

export interface TrendingTokensResponse {
  updateUnixTime: number;
  updateTime: string;
  tokens: TrendingToken[];
  total: number;
}

export const getTrendingTokens = async ({
  offset = 0,
  limit = 20,
}: {
  offset?: number;
  limit?: number;
}): Promise<TrendingTokensResponse> => {
  return queryBirdeye<TrendingTokensResponse>("defi/token_trending", {
    sort_by: "rank",
    sort_type: "asc",
    offset,
    limit,
  });
};
