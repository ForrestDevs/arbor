import { VisualizationContainer } from '../visualization/VisualizationContainer';
import { TokenPriceData, PortfolioData, PnLData, VisualizationType } from '@/lib/types/chart';

interface ChatVisualizationProps {
  agentSlug: string;
  visualizationData: TokenPriceData | PortfolioData | PnLData;
  type: VisualizationType;
}

export function ChatVisualization({ agentSlug, visualizationData, type }: ChatVisualizationProps) {
  return (
    <div className="my-4 rounded-lg border border-gray-200">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium">Analysis Results</h3>
      </div>
      <div className="p-4">
        <VisualizationContainer
          agentSlug={agentSlug}
          data={visualizationData}
          type={type}
        />
      </div>
    </div>
  );
} 