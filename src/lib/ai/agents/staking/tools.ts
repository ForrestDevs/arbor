import { Connection } from "@solana/web3.js";

import { SolanaStakeAction, SolanaUnstakeAction, SolanaLiquidStakingYieldsAction, SolanaGetTokenDataAction } from "@/lib/ai/solana/actions";

import { SOLANA_STAKE_NAME, SOLANA_UNSTAKE_NAME, SOLANA_LIQUID_STAKING_YIELDS_NAME, SOLANA_GET_TOKEN_DATA_NAME } from "@/lib/ai/action-names";
import { solanaTool } from "@/lib/ai/solana";

export const STAKING_TOOLS = {
    [`staking-${SOLANA_STAKE_NAME}`]: solanaTool(new SolanaStakeAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`staking-${SOLANA_UNSTAKE_NAME}`]: solanaTool(new SolanaUnstakeAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`staking-${SOLANA_LIQUID_STAKING_YIELDS_NAME}`]: solanaTool(new SolanaLiquidStakingYieldsAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`staking-${SOLANA_GET_TOKEN_DATA_NAME}`]: solanaTool(new SolanaGetTokenDataAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
}