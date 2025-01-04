import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AmaranthAgent() {
  const [walletAddress, setWalletAddress] = useState("");
  const [taxAmount, setTaxAmount] = useState<number | null>(null);

  const handleCalculate = () => {
    // Simulating tax calculation
    setTaxAmount(Math.random() * 1000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Amaranth AI</h2>
      <p className="text-muted-foreground">
        Calculate taxes based on wallet activity
      </p>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <Button onClick={handleCalculate}>Calculate Tax</Button>
      </div>
      {taxAmount !== null && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Estimated Tax Amount:</h3>
          <p>${taxAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
