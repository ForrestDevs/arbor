"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Trade {
  timestamp: string;
  type: "buy" | "sell";
  token: string;
  amount: number;
  price: number;
  profit?: number;
}

interface TradeAnalysisViewProps {
  message: string;
  data?: {
    totalTrades: number;
    winRate: number;
    totalProfit: number;
    recentTrades: Trade[];
  };
}

export const TradeAnalysisView: React.FC<TradeAnalysisViewProps> = ({
  message,
  data,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Trade Analysis</h3>

        {data ? (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Trades</div>
                <div className="text-xl font-semibold mt-1">
                  {data.totalTrades}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Win Rate</div>
                <div className="text-xl font-semibold mt-1">
                  {data.winRate}%
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Total P/L</div>
                <div
                  className={`text-xl font-semibold mt-1 ${
                    data.totalProfit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data.totalProfit >= 0 ? "+" : ""}${data.totalProfit.toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">
                Recent Trades
              </h4>
              <div className="space-y-2">
                {data.recentTrades.map((trade, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium ${
                          trade.type === "buy" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {trade.type.toUpperCase()}
                      </span>
                      <div>
                        <div className="font-medium">{trade.token}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(trade.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {trade.amount} @ ${trade.price}
                      </div>
                      {trade.profit !== undefined && (
                        <div
                          className={`text-sm ${
                            trade.profit >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {trade.profit >= 0 ? "+" : ""}${trade.profit.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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