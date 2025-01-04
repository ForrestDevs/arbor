import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { elizaTEE } from "@/utils/eliza-tee";

export default function SeedAgent() {
  const [tokenName, setTokenName] = useState("");
  const [deployedTokens, setDeployedTokens] = useState<string[]>([]);
  // const [response, setResponse] = useState("");

  const handleDeploy = async () => {
    if (tokenName) {
      setDeployedTokens([...deployedTokens, tokenName]);
      // const result = await elizaTEE.processInput(tokenName, "CORE");
      // setResponse(result);
      setTokenName("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Seed AI</h2>
      <p className="text-muted-foreground">Manage and deploy tokens</p>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter token name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <Button onClick={handleDeploy}>Deploy Token</Button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Deployed Tokens:</h3>
        <ul className="list-disc pl-5">
          {deployedTokens.map((token, index) => (
            <li key={index}>{token}</li>
          ))}
        </ul>
      </div>
      {/* {response && (
        <div className="mt-4 p-4 bg-accent rounded-md">
          <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
          <p>{response}</p>
        </div>
      )} */}
    </div>
  );
}
