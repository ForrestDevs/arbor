"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PortfolioViewProps {
  message: string;
  // You would typically get more structured data from the API
  // This is a placeholder for the demo
  data?: {
    totalValue: number;
    gainPercentage: number;
    holdings: Array<{
      token: string;
      percentage: number;
      value: number;
    }>;
  };
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ message, data }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Portfolio Analysis</h3>
        
        {data ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Value</span>
              <span className="font-medium">${data.totalValue.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Performance</span>
              <span className={`font-medium ${data.gainPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.gainPercentage >= 0 ? '+' : ''}{data.gainPercentage}%
              </span>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-600 mb-3">Holdings</h4>
              <div className="space-y-2">
                {data.holdings.map((holding, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{holding.token}</span>
                      <span className="text-sm text-gray-500">{holding.percentage}%</span>
                    </div>
                    <span className="text-sm">${holding.value.toLocaleString()}</span>
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