import { queryBirdeye } from "./base";

interface TokenInfo {
  symbol: string;
  decimals: number;
  address: string;
  amount: string | number;
  type: string;
  type_swap: "from" | "to";
  fee_info?: any;
  ui_amount: number;
  price: number | null;
  nearest_price: number;
  change_amount: string | number;
  ui_change_amount: number;
}

export interface Trade {
  quote: TokenInfo;
  base: TokenInfo;
  base_price: number | null;
  quote_price: number | null;
  tx_hash: string;
  source: string;
  block_unix_time: number;
  tx_type: string;
  address: string | null;
  owner: string;
}

export interface TradesResponse {
  items: Trade[];
}

export type TxType = "swap" | "all";

interface SeekTradesByTimeParams {
  address: string;
  offset?: number;
  limit?: number;
  txType?: TxType;
  beforeTime?: number;
  afterTime?: number;
}

export const seekTradesByTime = async ({
  address,
  offset = 0,
  limit = 100,
  txType = "swap",
  beforeTime = 0,
  afterTime = 0,
}: SeekTradesByTimeParams): Promise<TradesResponse> => {
  return queryBirdeye<TradesResponse>("trader/txs/seek_by_time", {
    address,
    offset,
    limit,
    tx_type: txType,
    before_time: beforeTime,
    after_time: afterTime,
  });
};
