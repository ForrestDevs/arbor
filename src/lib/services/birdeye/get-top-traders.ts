import { queryBirdeye } from "./base";

export interface TopTrader {
  network: string;
  address: string;
  pnl: number;
  volume: number;
  trade_count: number;
}

export interface TopTradersResponse {
  items: TopTrader[];
}

export enum TimeFrame {
  Yesterday = "yesterday",
  Today = "today",
  Week = "1W",
}
export const getTopTraders = async (
  timeFrame: TimeFrame = TimeFrame.Week,
  offset: number = 0,
  limit: number = 10
): Promise<TopTradersResponse> => {
  return queryBirdeye<TopTradersResponse>("trader/gainers-losers", {
    type: timeFrame,
    sort_by: "PnL",
    sort_type: "desc",
    offset,
    limit,
  });
};
