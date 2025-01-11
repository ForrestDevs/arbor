import { Connection } from "@solana/web3.js";

import { SolanaGetTokenDataAction, SolanaGetTrendingTokensAction } from "@/lib/ai/solana/actions";

import { SOLANA_GET_TOKEN_DATA_NAME, SOLANA_GET_TRENDING_TOKENS_NAME } from "@/lib/ai/action-names";
import { solanaTool } from "@/lib/ai/solana";

export const MARKET_TOOLS = {
    [`market-${SOLANA_GET_TOKEN_DATA_NAME}`]: solanaTool(new SolanaGetTokenDataAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`market-${SOLANA_GET_TRENDING_TOKENS_NAME}`]: solanaTool(new SolanaGetTrendingTokensAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!))
}