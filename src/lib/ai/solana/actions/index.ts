import { SolanaBalanceAction } from "./balance";
import { SolanaTransferAction } from "./transfer"; 
import { SolanaTradeAction } from "./trade";
import { SolanaGetWalletAddressAction } from "./get-wallet-address";
import { SolanaGetTrendingTokensAction } from "./get-trending-tokens";
import { SolanaGetTokenDataAction } from "./get-token-data";
import { SolanaStakeAction } from "./stake";
import { SolanaUnstakeAction } from "./unstake";
import { SolanaAllBalancesAction } from "./all-balances";
import { SolanaLiquidStakingYieldsAction } from "./liquid-staking-yields";

import type { SolanaAction, SolanaActionSchemaAny } from "./solana-action";

export function getAllSolanaActions(): SolanaAction<SolanaActionSchemaAny, unknown>[] {
  return [
    new SolanaBalanceAction(),
    new SolanaTransferAction(),
    new SolanaTradeAction(),
    new SolanaGetWalletAddressAction(),
    new SolanaGetTrendingTokensAction(),
    new SolanaGetTokenDataAction(),
    new SolanaStakeAction(),
    new SolanaUnstakeAction(),
    new SolanaAllBalancesAction(),
    new SolanaLiquidStakingYieldsAction()
  ];
}

export const SOLANA_ACTIONS = getAllSolanaActions();

export * from './types';
export * from './solana-action';
export * from './balance';
export * from './transfer';
export * from './trade';
export * from './get-wallet-address';
export * from './get-trending-tokens';
export * from './get-token-data';
export * from './stake';
export * from './unstake';
export * from './all-balances';
export * from './liquid-staking-yields';