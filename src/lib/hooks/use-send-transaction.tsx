import {
  Connection,
  VersionedTransaction,
  AddressLookupTableAccount,
  TransactionMessage,
} from "@solana/web3.js";

import { usePrivy } from "@privy-io/react-auth";

import {
  useSolanaWallets,
  useActiveWallet,
  useSendSolanaTransaction,
} from "@privy-io/react-auth";

export const useSendTransaction = () => {
  const { user } = usePrivy();

  const wallet = user?.wallet;

  const { sendSolanaTransaction } = useSendSolanaTransaction();

  const sendTransaction = async (transaction: VersionedTransaction) => {
    if (!wallet) throw new Error("No wallets found");

    const connection = new Connection(process.env.RPC_URL!);

    return sendSolanaTransaction(transaction, connection);
  };

  return {
    sendTransaction,
    wallet,
  };
};
