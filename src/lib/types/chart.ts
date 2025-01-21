export interface TokenPriceData {
  timestamps: string[];
  prices: number[];
  token: string;
  timeframe: string;
}

export interface PortfolioData {
  tokens: string[];
  values: number[];
}

export interface PnLData {
  dates: string[];
  profits: number[];
  losses: number[];
}

export type VisualizationType = 'price' | 'distribution' | 'pnl'; 