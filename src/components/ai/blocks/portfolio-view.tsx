"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Portfolio } from "@/lib/services/birdeye";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export const PortfolioView: React.FC<Portfolio> = (props) => {
  const { totalUsd, items } = props;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Portfolio Analysis</CardTitle>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600">Total Value</span>
          <span className="font-medium">
            ${totalUsd?.toLocaleString() ?? 0}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Amount</TableHead>
                {/* <TableHead>Price</TableHead>
                <TableHead>Value</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.address}>
                  <TableCell>
                    <div className="flex items-center">
                      <Image
                        src={item.logoURI || "/placeholder.svg"}
                        alt={item.name}
                        className="w-6 h-6 mr-2 rounded-full"
                        width={24}
                        height={24}
                      />
                      <span>
                        {item.name} ({item.symbol})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.uiAmount.toLocaleString()}</TableCell>
                  {/* <TableCell>${item.priceUsd.toFixed(4)}</TableCell>
                  <TableCell>${item.valueUsd.toLocaleString()}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
