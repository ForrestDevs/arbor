"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TrendingToken {
  name: string;
  symbol: string;
  priceChange: number;
  volume: string;
}

interface TrendingTokensViewProps {
  message: string;
  data?: {
    tokens: TrendingToken[];
  };
}

export const TrendingTokensView: React.FC<TrendingTokensViewProps> = ({
  message,
  data,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Trending Tokens</h3>

        {data ? (
          <div className="space-y-4">
            {data.tokens.map((token, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm">#{index + 1}</span>
                  <div>
                    <h4 className="font-medium">{token.name}</h4>
                    <span className="text-sm text-gray-500">{token.symbol}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`font-medium ${
                      token.priceChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {token.priceChange >= 0 ? "+" : ""}
                    {token.priceChange}%
                  </span>
                  <span className="text-sm text-gray-500">
                    Vol: {token.volume}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">{message}</div>
        )}
      </CardContent>
    </Card>
  );
}; 