import { queryDex } from "./base";

interface DexPair {
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  chainId: string;
  dexId: string;
  fdv: number;
  info: {
    header: string;
    imageUrl: string;
    openGraph: string;
    socials: Array<{
      type: string;
      url: string;
    }>;
    websites: Array<{
      label: string;
      url: string;
    }>;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  marketCap: number;
  pairAddress: string;
  pairCreatedAt: number;
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  priceNative: string;
  priceUsd: string;
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  url: string;
  volume: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
}

export interface TokenResponse {
  pairs: DexPair[];
  schemaVersion: string;
}

export const getDexToken = async (address: string): Promise<TokenResponse> => {
  const data = await queryDex<TokenResponse>(`dex/tokens/${address}`);
  return data;
};
