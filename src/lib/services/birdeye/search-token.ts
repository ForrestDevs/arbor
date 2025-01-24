import { queryBirdeye } from "./base";

export interface SearchTokenItem {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  fdv: number;
  market_cap: number;
  liquidity: number;
  volume_24h_change_percent: number | null;
  price: number;
  price_change_24h_percent: number;
  network: string;
  buy_24h: number;
  buy_24h_change_percent: number | null;
  sell_24h: number;
  sell_24h_change_percent: number | null;
  trade_24h: number;
  trade_24h_change_percent: number | null;
  unique_wallet_24h: number;
  unique_view_24h_change_percent: number | null;
  last_trade_human_time: string;
  last_trade_unix_time: number;
  creation_time: string;
  volume_24h_usd: number;
  logo_uri: string;
  verified: boolean;
}

export interface SearchTokenResponse {
  items: {
    type: string;
    result: SearchTokenItem[];
  }[];
}

export const searchToken = async (
  keyword: string,
  offset: number = 0,
  limit: number = 20
): Promise<SearchTokenResponse> => {
  return queryBirdeye<SearchTokenResponse>("defi/v3/search", {
    keyword,
    target: "token",
    sort_by: "volume_24h_usd",
    sort_type: "desc",
    markets: "Raydium,Pump.fun",
    offset,
    limit,
  });
};
