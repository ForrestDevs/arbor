export type SolanaToken = {
  id: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags: string[];
  daily_volume: number;
  created_at: string;
  freeze_authority: string | null;
  mint_authority: string | null;
  permanent_delegate: string | null;
  minted_at: string | null;
  extensions: {
    coingeckoId: string;
  };
};

export interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  tags: string[];
  logoURI: string;
  freezeAuthority: string | null;
  mintAuthority: string | null;
  permanentDelegate: string | null;
  extensions: {
    coingeckoId?: string;
  };
}
