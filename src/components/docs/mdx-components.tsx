"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import mermaid from "mermaid";

export function SystemArchitectureDiagram() {
  return (
    <div className="my-8 p-6 bg-accent rounded-lg">
      <Image
        src="/docs/system-architecture.png"
        alt="Seed AI System Architecture"
        width={800}
        height={500}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}

export function NeuralNetworkVisualizer() {
  const [layers, setLayers] = useState([4, 6, 6, 3]);

  return (
    <div className="my-8 p-6 bg-accent rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Interactive Neural Network</h3>
      <div className="flex justify-center">
        {/* Add neural network visualization here */}
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setLayers([...layers, 4])}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Add Layer
        </button>
        <button
          onClick={() => setLayers(layers.slice(0, -1))}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Remove Layer
        </button>
      </div>
    </div>
  );
}

export function MetricsChart() {
  return (
    <div className="my-8 p-6 bg-accent rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
      {/* Add chart component here */}
    </div>
  );
}

export function CodeExample({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8">
      <div className="bg-accent rounded-lg p-4">{children}</div>
    </div>
  );
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    mermaid.initialize({
      theme: "dark",
      startOnLoad: true,
      securityLevel: "loose",
    });

    mermaid.render("mermaid", chart).then(({ svg }) => {
      setSvg(svg);
    });
  }, [chart]);

  return (
    <div
      className="my-8 p-6 bg-accent rounded-lg overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
