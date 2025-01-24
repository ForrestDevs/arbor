import { queryBirdeye } from "./base";

export interface Price {
  value: number;
  updateUnixTime: number;
  updateHumanTime: string;
  liquidity: number;
  priceChange24h: number;
}

export const getPrice = async (address: string): Promise<Price> => {
  return queryBirdeye<Price>("defi/price", {
    address,
    include_liquidity: "true",
  });
};
