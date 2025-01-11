import { Connection } from "@solana/web3.js";

import { SolanaTradeAction } from "@/lib/ai/solana/actions";

import { SOLANA_GET_TOKEN_DATA_NAME, SOLANA_TRADE_NAME } from "@/lib/ai/action-names";
import { solanaTool } from "@/lib/ai/solana";
import { SolanaGetTokenDataAction } from "@/lib/ai/solana/actions";

export const TRADING_TOOLS = {
    [`trading-${SOLANA_TRADE_NAME}`]: solanaTool(new SolanaTradeAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`trading-${SOLANA_GET_TOKEN_DATA_NAME}`]: solanaTool(new SolanaGetTokenDataAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
}