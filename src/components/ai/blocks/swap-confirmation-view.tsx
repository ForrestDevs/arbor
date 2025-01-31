"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAI } from "@/components/ai/context";
import { DEFAULT_EXPLORER, FormProps } from "@/lib/types/jupiter";
import { useUnifiedWalletContext } from "@jup-ag/wallet-adapter";
import { init, syncProps } from "@jup-ag/terminal";
import { PublicKey } from "@solana/web3.js";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Skeleton } from "@/components/ui/skeleton";
import Swap from "./swap";
import { Token } from "@/lib/types/solana/token";
import { useTokenDataByAddress } from "@/lib/hooks/queries/token-data/use-token-data-by-address";

interface SwapConfirmationViewProps {
  token_address_to_swap: string;
  token_address_to_receive: string;
  num_tokens_to_swap: string;
}

export const SwapConfirmationView: React.FC<SwapConfirmationViewProps> = ({
  token_address_to_swap,
  token_address_to_receive,
  num_tokens_to_swap,
}) => {
  // const { inputTokenData, outputTokenData, args } = data;
  const { sendClientEvent } = useAI();

  const { data: inputTokenData, isLoading: inputTokenLoading } =
    useTokenDataByAddress(token_address_to_swap);
  const { data: outputTokenData, isLoading: outputTokenLoading } =
    useTokenDataByAddress(token_address_to_receive);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Confirm Swap</h3>
        <Swap
          initialInputToken={inputTokenData}
          initialOutputToken={outputTokenData}
          inputLabel="Sell"
          outputLabel="Buy"
          initialInputAmount={num_tokens_to_swap}
          swapText="Swap"
          swappingText="Swapping..."
          onSuccess={(tx) => {
            console.log("tx", tx);

            // addToolResult<SolanaTradeResultBodyType>(toolCallId, {
            //   message: `Swap successful!`,
            //   body: {
            //     transaction: tx,
            //     inputAmount: args.inputAmount || 0,
            //     inputToken: inputTokenData?.symbol || "",
            //     outputToken: outputTokenData?.symbol || "",
            //   },
            // });
          }}
          onError={(error) => {
            console.log("error", error);
            // addToolResult(toolCallId, {
            //   message: `Swap failed: ${error}`,
            // });
          }}
          onCancel={() => {
            console.log("cancelled");
            // addToolResult(toolCallId, {
            //   message: `Swap cancelled`,
            // });
          }}
        />
      </CardContent>
    </Card>
  );
};
