import { Agent } from "./type";
import { z } from "zod";

export const agents: Agent[] = [
  {
    name: "Price Analysis Agent",
    slug: "price-analysis",
    systemPrompt:
      "I am a cryptocurrency price analysis expert. I can fetch historical price data, create interactive charts, and provide technical analysis for various tokens.",
    capabilities:
      "Can fetch price history, display interactive charts, and perform technical analysis for any cryptocurrency token.",
    tools: {
      getTokenPrice: {
        description: "Get current and historical price data for any token",
        parameters: z.object({
          token: z.string(),
          timeframe: z.enum(["24h", "7d", "30d", "90d", "1y"]),
          currency: z.string().default("USD"),
        }),
        execute: async () => {
          // Implementation needed
          return "Price data fetched";
        },
      },
      getTechnicalAnalysis: {
        description: "Get technical analysis indicators",
        parameters: z.object({
          token: z.string(),
          indicators: z.array(z.enum(["RSI", "MACD", "MA", "BB"])),
        }),
        execute: async () => {
          // Implementation needed
          return "Technical analysis data";
        },
      },
    },
  },
  {
    name: "Portfolio Tracker",
    slug: "portfolio-tracker",
    systemPrompt:
      "I am a portfolio tracking specialist. I can analyze wallet holdings, track PnL, and provide detailed portfolio analytics.",
    capabilities:
      "Can track wallet portfolios, calculate PnL, and display portfolio analytics with custom visualizations.",
    tools: {
      getWalletPortfolio: {
        description: "Get detailed portfolio information for a wallet",
        parameters: z.object({
          walletAddress: z.string(),
          chain: z.enum(["solana", "ethereum"]),
        }),
        execute: async () => {
          // Implementation needed
          return "Portfolio data";
        },
      },
      getPnL: {
        description: "Calculate profit and loss for a wallet",
        parameters: z.object({
          walletAddress: z.string(),
          timeframe: z.enum(["24h", "7d", "30d", "all"]),
        }),
        execute: async () => {
          // Implementation needed
          return "PnL data";
        },
      },
    },
  },
  {
    name: "Social Media Agent",
    slug: "social-media",
    systemPrompt:
      "I am a social media specialist focused on crypto-related content. I can fetch and analyze tweets from crypto accounts.",
    capabilities:
      "Can fetch latest tweets, analyze sentiment, and track social media metrics for crypto accounts.",
    tools: {
      getLatestTweets: {
        description: "Fetch recent tweets from a Twitter account",
        parameters: z.object({
          username: z.string(),
          count: z.number().min(1).max(100),
        }),
        execute: async () => {
          // Implementation needed
          return "Tweet data";
        },
      },
    },
  },
  {
    name: "DeFi Operations Agent",
    slug: "defi-ops",
    systemPrompt:
      "I am a DeFi operations specialist. I can help with swapping, bridging, and staking tokens on Solana.",
    capabilities:
      "Can assist with token swaps, cross-chain bridges, and staking operations on Solana.",
    tools: {
      getSwapQuote: {
        description: "Get quote for token swap",
        parameters: z.object({
          fromToken: z.string(),
          toToken: z.string(),
          amount: z.number(),
        }),
        execute: async () => {
          // Implementation needed
          return "Swap quote";
        },
      },
      getBridgeQuote: {
        description: "Get quote for token bridge",
        parameters: z.object({
          fromChain: z.string(),
          toChain: z.string(),
          token: z.string(),
          amount: z.number(),
        }),
        execute: async () => {
          // Implementation needed
          return "Bridge quote";
        },
      },
      getStakingOptions: {
        description: "Get available staking options",
        parameters: z.object({
          token: z.string(),
        }),
        execute: async () => {
          // Implementation needed
          return "Staking options";
        },
      },
    },
  },
  {
    name: "Web Research Agent",
    slug: "web-research",
    systemPrompt:
      "I am a web research specialist. I can search and analyze information from various online sources.",
    capabilities:
      "Can search the web, analyze articles, and provide summarized information from multiple sources.",
    tools: {
      searchWeb: {
        description: "Search the web for specific information",
        parameters: z.object({
          query: z.string(),
          resultCount: z.number().min(1).max(10),
        }),
        execute: async () => {
          // Implementation needed
          return "Search results";
        },
      },
      analyzeArticle: {
        description: "Analyze and summarize an article",
        parameters: z.object({
          url: z.string().url(),
        }),
        execute: async () => {
          // Implementation needed
          return "Article analysis";
        },
      },
    },
  },
  {
    name: "Market Agent",
    slug: "trending-token",
    systemPrompt: `
      You are a market agent. You are responsible for all queries regarding the market.

      You have access to the following tools:
      - ${SOLANA_GET_TRENDING_TOKENS_NAME}
      - ${SOLANA_GET_TOP_TRADERS_NAME}
      - ${SOLANA_GET_TRADER_TRADES_NAME}

      You can use these tools to help users with getting token data and trending tokens.

      ${SOLANA_GET_TRENDING_TOKENS_NAME} will return the trending tokens in the market

      ${SOLANA_GET_TOP_TRADERS_NAME} will return information about the top traders in the market.

      ${SOLANA_GET_TRADER_TRADES_NAME} will return information about the trades for a trader.

      You do not have to describe your responses after using a tool as they will be shown in the UI.`,
    capabilities: `
      The Market Agent can get the current trending tokens, get the top traders for a time frame (yesterday, today, 1W), 
      and get the trading history for a wallet address.
    
      Call this agent whenever the user asks for trading data but is not asking to make a specific trade.`,
    tools: {
      getTrendingTokens: {
        description: "Get trending tokens based on market activity",
        parameters: z.object({
          count: z.number().min(1).max(10),
        }),
        execute: async () => {
          // Implementation needed
          return "Trending tokens";
        },
      },
    },
  },
];
