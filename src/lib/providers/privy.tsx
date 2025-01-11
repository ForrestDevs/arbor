"use client";

import { PrivyProvider as PrivyProviderBase } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

interface Props {
  children: React.ReactNode;
}

const solanaConnectors = toSolanaWalletConnectors({
  shouldAutoConnect: false,
});

export const PrivyProvider: React.FC<Props> = ({ children }) => {
  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#0000ff",
          logo: <img src="/arbor.png" alt="logo" className="rounded-lg" />,
        },
        externalWallets: {
          solana: {
            connectors: solanaConnectors,
          },
        },
        // solanaClusters: [
        //   {
        //     name: "mainnet-beta",
        //     rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
        //   },
        // ],
      }}
    >
      {children}
    </PrivyProviderBase>
  );
};
