import { queryBirdeye } from "./base";

export type PortfolioItem = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  uiAmount: number;
  chainId: string;
  logoURI: string;
  priceUsd: number;
  valueUsd: number;
};

export type Portfolio = {
  wallet: string;
  totalUsd: number;
  items: PortfolioItem[];
};

export const getPortfolio = async (wallet: string): Promise<Portfolio> => {
  return queryBirdeye<Portfolio>(`v1/wallet/token_list`, { wallet });
};
