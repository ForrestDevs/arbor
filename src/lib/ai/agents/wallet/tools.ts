import { Connection } from "@solana/web3.js";

import { SolanaAllBalancesAction, SolanaBalanceAction, SolanaGetTokenDataAction, SolanaGetWalletAddressAction, SolanaTransferAction } from "@/lib/ai/solana/actions";

import { SOLANA_ALL_BALANCES_NAME, SOLANA_BALANCE_NAME, SOLANA_GET_TOKEN_DATA_NAME, SOLANA_GET_WALLET_ADDRESS_NAME, SOLANA_TRANSFER_NAME } from "@/lib/ai/action-names";
import { solanaTool } from "@/lib/ai/solana";

export const WALLET_TOOLS = {
    [`wallet-${SOLANA_GET_WALLET_ADDRESS_NAME}`]: solanaTool(new SolanaGetWalletAddressAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`wallet-${SOLANA_BALANCE_NAME}`]: solanaTool(new SolanaBalanceAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`wallet-${SOLANA_ALL_BALANCES_NAME}`]: solanaTool(new SolanaAllBalancesAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`wallet-${SOLANA_GET_TOKEN_DATA_NAME}`]: solanaTool(new SolanaGetTokenDataAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
    [`wallet-${SOLANA_TRANSFER_NAME}`]: solanaTool(new SolanaTransferAction(), new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!)),
}