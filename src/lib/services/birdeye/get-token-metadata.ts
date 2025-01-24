import { queryBirdeye } from "./base";

export interface TokenMetadataResponse {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  extensions: {
    description: string;
    website: string;
    twitter: string;
    telegram: string;
    discord: string;
  };
}

export const getTokenMetadata = async (
  address: string
): Promise<TokenMetadataResponse> => {
  return queryBirdeye<TokenMetadataResponse>(
    "defi/v3/token/meta-data/single",
    {
      address,
    }
  );
};
