import { queryBirdeye } from "./base";

export interface Point {
  unixTime: number;
  value: number;
}

export type PriceHistoryResponse = {
  items: Point[];
};

export const getPriceHistorical = async (
  address: string,
  start: number,
  end: number
): Promise<PriceHistoryResponse> => {
  return queryBirdeye<PriceHistoryResponse>("defi/history_price", {
    address,
    address_type: "token",
    type: "1m",
    time_from: start,
    time_to: end,
  });
};
