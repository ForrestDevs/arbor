import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChiaAgent() {
  const [walletAddress, setWalletAddress] = useState("");
  const [portfolioValue, setPortfolioValue] = useState<number | null>(null);

  const handleAnalyze = () => {
    // Simulating portfolio analysis
    setPortfolioValue(Math.random() * 10000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Chia AI</h2>
      <p className="text-muted-foreground">
        Manage portfolio and track token prices
      </p>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <Button onClick={handleAnalyze}>Analyze Portfolio</Button>
      </div>
      {portfolioValue !== null && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Portfolio Value:</h3>
          <p>${portfolioValue.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
