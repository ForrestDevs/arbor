import { queryBirdeye } from "./base";

export type Transaction = {
  txHash: string;
  blockNumber: number;
  blockTime: string;
  status: boolean;
  from: string;
  to: string;
  fee: number;
  mainAction: string;
  balanceChange: [
    {
      amount: number;
      symbol: string;
      name: string;
      decimals: number;
      address: string;
      logoURI: string;
    }
  ];
  contractLabel: {
    address: string;
    name: string;
    metadata: {
      icon: string;
    };
  };
};

export type Transactions = {
  solana: Transaction[];
  ethereum: Transaction[];
};

export const getTransactions = async (
  wallet: string
): Promise<Transactions> => {
  return queryBirdeye<Transactions>(`v1/wallet/tx_list`, { wallet });
};
