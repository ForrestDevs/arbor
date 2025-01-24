"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface MemoryConfirmationViewProps {
  message: string;
  data?: {
    key: string;
    value: string;
    timestamp: string;
  };
}

export const MemoryConfirmationView: React.FC<MemoryConfirmationViewProps> = ({
  message,
  data,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {data ? (
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Memory Saved</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Key:</span>
                  <span className="ml-2 font-medium">{data.key}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Value:</span>
                  <span className="ml-2">{data.value}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Saved on {new Date(data.timestamp).toLocaleString()}
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