import { TokenPriceChart } from '../charts/TokenPriceChart';
import { PortfolioDistribution } from '../charts/PortfolioDistribution';
import { PnLChart } from '../charts/PnLChart';
import { TokenPriceData, PortfolioData, PnLData, VisualizationType } from '@/lib/types/chart';

interface VisualizationContainerProps {
  agentSlug: string;
  data: TokenPriceData | PortfolioData | PnLData;
  type: VisualizationType;
}

export function VisualizationContainer({ agentSlug, data, type }: VisualizationContainerProps) {
  const renderVisualization = () => {
    switch (type) {
      case 'price':
        return <TokenPriceChart data={data as TokenPriceData} timeframe={(data as TokenPriceData).timeframe} />;
      
      case 'distribution':
        return <PortfolioDistribution data={data as PortfolioData} />;
      
      case 'pnl':
        return <PnLChart data={data as PnLData} />;
      
      default:
        return <div>No visualization available</div>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4">
      {renderVisualization()}
    </div>
  );
} 