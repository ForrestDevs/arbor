import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CloverAgent() {
  const [projectName, setProjectName] = useState("");
  const [projectPotential, setProjectPotential] = useState<string | null>(null);

  const handleAnalyze = () => {
    // Simulating project analysis
    const potential = Math.random();
    if (potential > 0.7) {
      setProjectPotential("High");
    } else if (potential > 0.4) {
      setProjectPotential("Medium");
    } else {
      setProjectPotential("Low");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">Clover AI</h2>
      <p className="text-muted-foreground">Discover potential gem projects</p>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button onClick={handleAnalyze}>Analyze Project</Button>
      </div>
      {projectPotential && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Project Potential:</h3>
          <p>{projectPotential}</p>
        </div>
      )}
    </div>
  );
}
