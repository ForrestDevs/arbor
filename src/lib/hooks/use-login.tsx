"use client";

import {
  useConnectWallet,
  usePrivy,
  useLogin as usePrivyLogin,
  Wallet,
} from "@privy-io/react-auth";

import { useFundWallet, useSolanaWallets } from "@privy-io/react-auth/solana";
import { useRouter } from "next/navigation";

export const useLogin = ({
  onComplete,
  redirectTo,
}: {
  onComplete?: (wallet: Wallet) => void;
  redirectTo?: boolean;
} = {}) => {
  const { user, ready, logout } = usePrivy();

  const { wallets, createWallet } = useSolanaWallets();
  const router = useRouter();
  const { login } = usePrivyLogin({
    onComplete: async (user, isNewUser) => {
      if (isNewUser && !user.wallet) {
        const wallet = await createWallet();
        onComplete?.(wallet);
      } else {
        onComplete?.(user.wallet!);
      }
      if (redirectTo) {
        router.push("/dashboard/copilot");
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { connectWallet } = useConnectWallet();

  const { fundWallet } = useFundWallet();

  return {
    user,
    ready,
    login,
    connectWallet,
    logout,
    wallets,
    fundWallet,
  };
};
