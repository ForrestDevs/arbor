"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAI } from "@/components/ai/context";

interface SwapConfirmationViewProps {
  message: string;
  data?: {
    fromToken: {
      symbol: string;
      amount: number;
      usdValue: number;
    };
    toToken: {
      symbol: string;
      estimatedAmount: number;
      usdValue: number;
    };
    exchangeRate: number;
    priceImpact: number;
    fee: number;
  };
}

export const SwapConfirmationView: React.FC<SwapConfirmationViewProps> = ({
  message,
  data,
}) => {
  const { sendClientEvent } = useAI();

  const handleConfirm = () => {
    sendClientEvent({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Confirm swap",
          },
        ],
      },
    });
    sendClientEvent({ type: "response.create" });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Confirm Swap</h3>

        {data ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">You Pay</div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-lg font-semibold">
                    {data.fromToken.amount} {data.fromToken.symbol}
                  </div>
                  <div className="text-sm text-gray-600">
                    ≈ ${data.fromToken.usdValue.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">You Receive</div>
                <div className="flex justify-between items-center mt-1">
                  <div className="text-lg font-semibold">
                    ≈ {data.toToken.estimatedAmount} {data.toToken.symbol}
                  </div>
                  <div className="text-sm text-gray-600">
                    ≈ ${data.toToken.usdValue.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Exchange Rate</span>
                <span>
                  1 {data.fromToken.symbol} = {data.exchangeRate}{" "}
                  {data.toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price Impact</span>
                <span
                  className={
                    data.priceImpact > 2 ? "text-red-600" : "text-gray-900"
                  }
                >
                  {data.priceImpact}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Network Fee</span>
                <span>${data.fee}</span>
              </div>
            </div>

            <Button onClick={handleConfirm} className="w-full">
              Confirm Swap
            </Button>
          </div>
        ) : (
          <div className="text-gray-600">{message}</div>
        )}
      </CardContent>
    </Card>
  );
}; 