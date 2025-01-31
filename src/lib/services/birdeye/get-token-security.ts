import { queryBirdeye } from "./base";

export interface TokenSecurity {
  creatorAddress: string;
  creatorOwnerAddress: string | null;
  ownerAddress: string | null;
  ownerOfOwnerAddress: string | null;
  creationTx: string;
  creationTime: number;
  creationSlot: number;
  mintTx: string;
  mintTime: number;
  mintSlot: number;
  creatorBalance: number;
  ownerBalance: number | null;
  ownerPercentage: number | null;
  creatorPercentage: number;
  metaplexUpdateAuthority: string;
  metaplexOwnerUpdateAuthority: string;
  metaplexUpdateAuthorityBalance: number | null;
  metaplexUpdateAuthorityPercent: number | null;
  mutableMetadata: boolean;
  top10HolderBalance: number;
  top10HolderPercent: number;
  top10UserBalance: number;
  top10UserPercent: number;
  isTrueToken: boolean | null;
  fakeToken: boolean | null;
  totalSupply: number;
  preMarketHolder: string[];
  lockInfo: any | null;
  freezeable: boolean | null;
  freezeAuthority: string | null;
  transferFeeEnable: boolean | null;
  transferFeeData: any | null;
  isToken2022: boolean;
  nonTransferable: boolean | null;
  jupStrictList: boolean;
}

export const getTokenSecurity = async (
  address: string
): Promise<TokenSecurity> => {
  return queryBirdeye<TokenSecurity>("defi/token_security", {
    address,
  });
};
