import { queryBirdeye } from "./base";

export interface OHLCVPoint {
  unixTime: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  type: string;
  address: string;
}

export interface TokenOHLCV {
  items: OHLCVPoint[];
}

export const getTokenOHLCV = async (
  address: string,
  start: number,
  end: number,
  type: string = "3m"
): Promise<TokenOHLCV> => {
  return queryBirdeye<TokenOHLCV>("defi/ohlcv", {
    address,
    type,
    time_from: start,
    time_to: end,
  });
};
