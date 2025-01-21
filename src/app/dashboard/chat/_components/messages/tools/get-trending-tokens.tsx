import { ToolInvocation } from "ai";
import { Card } from "@/components/ui/card";
import ToolCard from "./tool-card";

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetTrendingTokens: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Trending Tokens...`}
      result={{
        heading: (result: any) =>
          result.body
            ? `Fetched Trending Tokens`
            : `Failed to fetch trending tokens`,
        body: (result: any) =>
          result.body ? (
            <TrendingTokens body={result.body} />
          ) : (
            "No trending tokens found"
          ),
      }}
      defaultOpen={true}
      prevToolAgent={prevToolAgent}
      className="w-full"
    />
  );
};

const TrendingTokens = ({ body }: { body: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <span>{body}</span>
      {body.tokens.map((token: any, index: number) => (
        <TokenCard
          key={token.address}
          token={token}
          price={body.prices[index]}
        />
      ))}
    </div>
  );
};

const TokenCard = ({ token, price }: { token: any; price: number }) => {
  return (
    <Card className="flex flex-col gap-2 p-2 justify-center">
      <div className="flex flex-row items-center gap-2">
        <img
          src={token.logoURI}
          alt={token.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-sm font-bold">
            {token.name} ({token.symbol})
          </p>
          <p className="text-xs text-muted-foreground">
            ${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xs text-muted-foreground">
          24h Volume: ${token.daily_volume.toLocaleString()}
        </p>
      </div>
    </Card>
  );
};

export default GetTrendingTokens;
