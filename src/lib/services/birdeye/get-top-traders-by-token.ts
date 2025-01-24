import { queryBirdeye } from "./base";

export interface TopTraderByToken {
  tokenAddress: string;
  owner: string;
  tags: string[];
  type: string;
  volume: number;
  trade: number;
  tradeBuy: number;
  tradeSell: number;
  volumeBuy: number;
  volumeSell: number;
}

export interface TopTradersByTokenResponse {
  items: TopTraderByToken[];
}

export enum TopTradersByTokenTimeFrame {
  ThirtyMin = "30m",
  OneHour = "1h",
  TwoHours = "2h",
  FourHours = "4h",
  SixHours = "6h",
  EightHours = "8h",
  TwelveHours = "12h",
  TwentyFourHours = "24h",
}
export enum TopTradersByTokenSortType {
  Ascending = "asc",
  Descending = "desc",
}

export enum TopTradersByTokenSortBy {
  Volume = "volume",
  Trade = "trade",
}

interface GetTopTradersByTokenParams {
  address: string;
  timeFrame?: TopTradersByTokenTimeFrame;
  sortType?: TopTradersByTokenSortType;
  sortBy?: TopTradersByTokenSortBy;
  offset?: number;
  limit?: number;
}

export const getTopTradersByToken = async ({
  address,
  timeFrame = TopTradersByTokenTimeFrame.TwentyFourHours,
  sortType = TopTradersByTokenSortType.Descending,
  sortBy = TopTradersByTokenSortBy.Volume,
  offset = 0,
  limit = 10,
}: GetTopTradersByTokenParams): Promise<TopTradersByTokenResponse> => {
  return queryBirdeye<TopTradersByTokenResponse>("defi/v2/tokens/top_traders", {
    address,
    time_frame: timeFrame,
    sort_type: sortType,
    sort_by: sortBy,
    offset,
    limit,
  });
};
