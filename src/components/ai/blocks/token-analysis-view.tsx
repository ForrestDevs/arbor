"use client";

import React, { useEffect, useMemo } from "react";
import {
  init,
  dispose,
  Chart,
  LineType,
  CandleType,
  KLineData,
} from "klinecharts";
import { Card, CardContent } from "@/components/ui/card";

import {
  PriceHistoryResponse,
  TokenMetadataResponse,
} from "@/lib/services/birdeye";
import { TokenOHLCV } from "@/lib/services/birdeye/get-token-ohlcv";
import { TokenOverview } from "@/lib/services/birdeye/get-token-overview";
import { TokenSecurity } from "@/lib/services/birdeye/get-token-security";
import { CopyIcon, DollarSign, GlobeIcon, TwitterIcon } from "lucide-react";
import { TokenResponse } from "@/lib/services/dex/get-token";

interface TokenAnalysisViewProps {
  dexMetaData: TokenResponse;
  metadata: TokenMetadataResponse;
  ohlcv: TokenOHLCV;
  tokenOverview: TokenOverview;
  tokenSecurity: TokenSecurity;
}

export const TokenAnalysisView: React.FC<TokenAnalysisViewProps> = ({
  dexMetaData,
  metadata,
  ohlcv,
  tokenOverview,
  tokenSecurity,
}) => {
  const [timeframe, setTimeframe] = React.useState("1m");
  const [chartType, setChartType] = React.useState<"candle" | "area">("candle");
  const [dataType, setDataType] = React.useState<"price" | "mcap">("price");

  // Memoize both price and market cap data series
  const { priceData, mcapData } = useMemo(() => {
    const circulatingSupply = tokenOverview.circulatingSupply;

    const baseData = ohlcv.items.map((item) => ({
      timestamp: item.unixTime * 1000,
      volume: item.v,
      turnover: item.v * ((item.o + item.c) / 2),
    }));

    return {
      priceData: baseData.map((base, i) => ({
        ...base,
        open: ohlcv.items[i].o,
        high: ohlcv.items[i].h,
        low: ohlcv.items[i].l,
        close: ohlcv.items[i].c,
      })),
      mcapData: baseData.map((base, i) => ({
        ...base,
        open: ohlcv.items[i].o * circulatingSupply,
        high: ohlcv.items[i].h * circulatingSupply,
        low: ohlcv.items[i].l * circulatingSupply,
        close: ohlcv.items[i].c * circulatingSupply,
      })),
    };
  }, [ohlcv.items, tokenOverview.circulatingSupply]);

  useEffect(() => {
    const chart = init("chart", {
      styles: {
        grid: {
          show: true,
          horizontal: {
            show: true,
            size: 1,
            color: "rgba(237, 237, 237, 0.2)",
            style: LineType.Dashed,
            dashedValue: [2, 2],
          },
          vertical: {
            show: true,
            size: 1,
            color: "rgba(237, 237, 237, 0.2)",
            style: LineType.Dashed,
            dashedValue: [2, 2],
          },
        },
        candle: {
          type:
            chartType === "candle" ? CandleType.CandleSolid : CandleType.Area,
          bar: {
            upColor: "#22c55e",
            downColor: "#ef4444",
            noChangeColor: "#888888",
            upBorderColor: "#22c55e",
            downBorderColor: "#ef4444",
            noChangeBorderColor: "#888888",
          },
          area: {
            lineSize: 2,
            lineColor: "#2196F3",
            value: "close",
            backgroundColor: [
              {
                offset: 0,
                color: "rgba(33, 150, 243, 0.1)",
              },
              {
                offset: 1,
                color: "rgba(33, 150, 243, 0.02)",
              },
            ],
          },
        },
        xAxis: {
          tickText: { color: "#94a3b8" },
        },
        yAxis: {
          tickText: { color: "#94a3b8" },
        },
      },
    });

    // Use the memoized data based on dataType
    const klineData = dataType === "price" ? priceData : mcapData;
    chart?.applyNewData(klineData);

    const chartContainer = document.getElementById("chart-container");
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainer && chart) {
        chart.resize();
      }
    });

    if (chartContainer) {
      resizeObserver.observe(chartContainer);
    }

    return () => {
      if (chartContainer) {
        resizeObserver.unobserve(chartContainer);
      }
      resizeObserver.disconnect();
      dispose("chart");
    };
  }, [chartType, ohlcv.items, priceData, mcapData, dataType]);

  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Token Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
              {dexMetaData.pairs[0].info.imageUrl ? (
                <img
                  src={dexMetaData.pairs[0].info.imageUrl}
                  alt={`${tokenOverview.name} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <DollarSign className="w-6 h-6" />
                </div>
              )}
            </div>
            <div>
              <h4 className="text-lg font-medium">{tokenOverview.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tokenOverview.symbol}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="break-all">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Contract Address
              </p>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded flex-1">
                  {tokenOverview.address}
                </code>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(tokenOverview.address)
                  }
                  className="p-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <CopyIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Social Links
              </p>
              <div className="flex gap-3">
                {["website", "twitter", "telegram", "discord"].map(
                  (platform) => {
                    const link = tokenOverview.extensions?.[platform];
                    return (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-colors ${
                          link
                            ? "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            : "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        {platform === "website" && (
                          <GlobeIcon className="w-5 h-5" />
                        )}
                        {platform === "twitter" && (
                          <TwitterIcon className="w-5 h-5" />
                        )}
                        {platform === "telegram" && <>T</>}
                        {platform === "discord" && <>D</>}
                      </a>
                    );
                  }
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Decimals:
              </span>
              <span className="font-medium">{tokenOverview.decimals}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h4 className="text-md font-medium mb-3">Market Overview</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Price:</span>
              <span className="font-medium">
                ${tokenOverview.price.toFixed(6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                24h Change:
              </span>
              <span
                className={`font-medium ${
                  tokenOverview.priceChange24hPercent >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {tokenOverview.priceChange24hPercent.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Market Cap:
              </span>
              <span className="font-medium">
                ${tokenOverview.mc.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Top 10 Holders:
              </span>
              <span className="font-medium">
                {tokenSecurity.top10HolderPercent.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Created:</span>
              <span className="font-medium">
                {new Date(
                  tokenSecurity.creationTime * 1000
                ).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Supply:</span>
              <span className="font-medium">
                {tokenSecurity.totalSupply.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow md:col-span-2 lg:col-span-3"
          id="chart-container"
        >
          <h4 className="text-md font-medium mb-3">Price Chart</h4>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setDataType("price")}
              className={`px-3 py-1 rounded ${
                dataType === "price"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Price
            </button>
            <button
              onClick={() => setDataType("mcap")}
              className={`px-3 py-1 rounded ${
                dataType === "mcap"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Market Cap
            </button>
          </div>
          <div
            id="chart"
            style={{
              width: "100%",
              height: "400px",
            }}
          />
        </div>

        {/* <div className="space-y-4">
          <div>
            <h4 className="text-md font-medium mb-2">Token Overview Debug</h4>
            <pre>{JSON.stringify(tokenOverview, null, 2)}</pre>
          </div>
          <div>
            <h4 className="text-md font-medium mb-2">Token Metadata Debug</h4>
            <pre>{JSON.stringify(metadata, null, 2)}</pre>
          </div>
          <div>
            <h4 className="text-md font-medium mb-2">OHLCV Debug</h4>
            <pre>{JSON.stringify(ohlcv, null, 2)}</pre>
          </div>
          <div>
            <h4 className="text-md font-medium mb-2">Token Security Debug</h4>
            <pre>{JSON.stringify(tokenSecurity, null, 2)}</pre>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default function TestChart() {
  const [timeframe, setTimeframe] = React.useState("1m");
  const [chartType, setChartType] = React.useState<"candle" | "area">("candle");

  useEffect(() => {
    const chart = init("chart", {
      styles: {
        grid: {
          show: true,
          horizontal: {
            show: true,
            size: 1,
            color: "rgba(237, 237, 237, 0.2)",
            style: LineType.Dashed,
            dashedValue: [2, 2],
          },
          vertical: {
            show: true,
            size: 1,
            color: "rgba(237, 237, 237, 0.2)",
            style: LineType.Dashed,
            dashedValue: [2, 2],
          },
        },
        candle: {
          type:
            chartType === "candle" ? CandleType.CandleSolid : CandleType.Area,
          bar: {
            upColor: "#22c55e",
            downColor: "#ef4444",
            noChangeColor: "#888888",
            upBorderColor: "#22c55e",
            downBorderColor: "#ef4444",
            noChangeBorderColor: "#888888",
          },
          area: {
            lineSize: 2,
            lineColor: "#2196F3",
            value: "close",
            backgroundColor: [
              {
                offset: 0,
                color: "rgba(33, 150, 243, 0.1)",
              },
              {
                offset: 1,
                color: "rgba(33, 150, 243, 0.02)",
              },
            ],
          },
        },
        xAxis: {
          tickText: { color: "#94a3b8" },
        },
        yAxis: {
          tickText: { color: "#94a3b8" },
        },
      },
    });

    const generateTimeframeData = (tf: string) => {
      const now = Date.now();
      let currentPrice = 4500;
      let currentVolatility = 15;

      // Adjust data points and interval based on timeframe
      const config = {
        "1m": { points: 60, interval: 60 * 1000 },
        "5m": { points: 60, interval: 5 * 60 * 1000 },
        "15m": { points: 60, interval: 15 * 60 * 1000 },
        "60m": { points: 60, interval: 60 * 60 * 1000 },
        "4h": { points: 60, interval: 4 * 60 * 60 * 1000 },
        "1d": { points: 60, interval: 24 * 60 * 60 * 1000 },
        "30d": { points: 60, interval: 30 * 24 * 60 * 60 * 1000 },
      }[tf];

      return Array.from({ length: config?.points || 0 }, (_, i) => {
        const { price, volatility } = generateRealisticPrice(
          currentPrice,
          currentVolatility
        );
        currentPrice = price;
        currentVolatility = volatility;

        const variance = volatility * 0.5;
        const high = price + Math.random() * variance;
        const low = price - Math.random() * variance;
        const open = low + Math.random() * (high - low);
        const close = low + Math.random() * (high - low);

        const priceChange = Math.abs(close - open);
        const volume = Math.floor(
          1000 + priceChange * 100 * (1 + Math.random())
        );

        return {
          timestamp:
            now - ((config?.points || 0) - 1 - i) * (config?.interval || 0),
          open,
          high,
          low,
          close,
          volume,
          turnover: volume * ((open + close) / 2),
        };
      });
    };

    const generateRealisticPrice = (prevPrice: number, volatility: number) => {
      const meanPrice = 4500;
      const meanReversionStrength = 0.1;
      const randomComponent = (Math.random() - 0.5) * volatility;
      const meanReversion = meanReversionStrength * (meanPrice - prevPrice);
      const change = meanReversion + randomComponent;
      const newVolatility = Math.max(
        5,
        Math.min(50, volatility * (1 + Math.abs(change) * 0.1))
      );
      return {
        price: prevPrice + change,
        volatility: newVolatility,
      };
    };

    const data = generateTimeframeData(timeframe);
    chart?.applyNewData(data);

    // const interval = setInterval(() => {
    //   const lastData = data[data.length - 1];
    //   const { price, volatility } = generateRealisticPrice(
    //     lastData.close,
    //   );

    //   const variance = volatility * 0.5;
    //   const high = price + Math.random() * variance;
    //   const low = price - Math.random() * variance;
    //   const close = low + Math.random() * (high - low);

    //   const priceChange = Math.abs(close - lastData.close);
    //   const volume = Math.floor(1000 + priceChange * 100 * (1 + Math.random()));

    //   const newData = {
    //     timestamp: Date.now(),
    //     open: lastData.close,
    //     high,
    //     low,
    //     close,
    //     volume,
    //     turnover: volume * ((lastData.close + close) / 2),
    //   };
    //   chart?.updateData(newData);
    // }, 1000);

    const chartContainer = document.getElementById("chart-container");
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainer && chart) {
        chart.resize();
      }
    });

    if (chartContainer) {
      resizeObserver.observe(chartContainer);
    }

    return () => {
      if (chartContainer) {
        resizeObserver.unobserve(chartContainer);
      }
      resizeObserver.disconnect();
      dispose("chart");
    };
  }, [timeframe, chartType]);

  return (
    <Card className="p-4 rounded-lg shadow-md h-full" id="chart-container">
      <CardContent className="h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {["1m", "5m", "15m", "60m", "4h", "1d", "30d"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded ${
                  timeframe === tf
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType("candle")}
              className={`px-3 py-1 rounded ${
                chartType === "candle"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Candle
            </button>
            <button
              onClick={() => setChartType("area")}
              className={`px-3 py-1 rounded ${
                chartType === "area"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Line
            </button>
          </div>
        </div>
        <div
          id="chart"
          style={{
            width: "100%",
            height: "calc(100% - 48px)",
            minHeight: "400px",
          }}
        />
      </CardContent>
    </Card>
  );
}
