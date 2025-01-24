"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TokenAnalysisViewProps {
  message: string;
  data?: {
    name: string;
    symbol: string;
    price: number;
    priceChange24h: number;
    volume24h: number;
    marketCap: number;
    supply: {
      total: number;
      circulating: number;
    };
  };
}

export const TokenAnalysisView: React.FC<TokenAnalysisViewProps> = ({
  message,
  data,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Token Analysis</h3>

        {data ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-semibold">{data.name}</h4>
                <span className="text-gray-500">{data.symbol}</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold">
                  ${data.price.toLocaleString()}
                </div>
                <span
                  className={`text-sm ${
                    data.priceChange24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {data.priceChange24h >= 0 ? "+" : ""}
                  {data.priceChange24h}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">24h Volume</div>
                <div className="text-lg font-semibold mt-1">
                  ${data.volume24h.toLocaleString()}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Market Cap</div>
                <div className="text-lg font-semibold mt-1">
                  ${data.marketCap.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-600">Supply Info</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Total Supply</div>
                  <div className="font-medium">
                    {data.supply.total.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Circulating Supply</div>
                  <div className="font-medium">
                    {data.supply.circulating.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-600">{message}</div>
        )}
      </CardContent>
    </Card>
  );
}; 