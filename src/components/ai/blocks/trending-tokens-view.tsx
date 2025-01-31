"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Search } from "lucide-react";
import type { TrendingToken } from "@/lib/services/birdeye";
import Image from "next/image";

// export const TrendingTokensView: React.FC<TrendingTokensViewProps> = ({
//   message,
//   data,
// }) => {
//   return (
//     <Card className="w-full">
//       <CardContent className="p-6">
//         <h3 className="text-lg font-semibold mb-4">Trending Tokens</h3>

//         {data ? (
//           <div className="space-y-4">
//             {data.tokens.map((token, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//               >
//                 <div className="flex items-center gap-3">
//                   <span className="text-gray-500 text-sm">#{index + 1}</span>
//                   <div>
//                     <h4 className="font-medium">{token.name}</h4>
//                     <span className="text-sm text-gray-500">
//                       {token.symbol}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end">
//                   <span
//                     className={`font-medium ${
//                       token.priceChange >= 0 ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {token.priceChange >= 0 ? "+" : ""}
//                     {token.priceChange}%
//                   </span>
//                   <span className="text-sm text-gray-500">
//                     Vol: {token.volume}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-gray-600">{message}</div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

interface TrendingTokensProps {
  tokens: TrendingToken[];
}

export function TrendingTokensView({ tokens }: TrendingTokensProps) {
  const [sortKey, setSortKey] = useState<keyof TrendingToken>("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredTokens = tokens
    .filter(
      (token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key: keyof TrendingToken) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Trending Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("price")}>
                    Price <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("price24hChangePercent")}
                  >
                    24h Change <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("volume24hUSD")}
                  >
                    24h Volume <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("liquidity")}
                  >
                    Liquidity <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                {/* <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("volume24hUSD")}
                  >
                    FDV <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredTokens.map((token) => (
                <TableRow key={token.address}>
                  <TableCell className="font-medium">{token.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Image
                        src={token.logoURI || "/placeholder.svg"}
                        alt={token.name}
                        className="w-6 h-6 mr-2 rounded-full"
                        width={24}
                        height={24}
                      />
                      <span>
                        {token.name} ({token.symbol})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>${token.price.toFixed(4)}</TableCell>
                  <TableCell
                    className={
                      token.price24hChangePercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {token.price24hChangePercent.toFixed(2)}%
                  </TableCell>
                  <TableCell>${token.volume24hUSD.toLocaleString()}</TableCell>
                  <TableCell>${token.liquidity.toLocaleString()}</TableCell>
                  {/* <TableCell>
                    ${token.volume24hUSD.toLocaleString()}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
