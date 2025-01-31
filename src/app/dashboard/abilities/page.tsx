"use client";

import React from "react";
import ArborArchitectureGraph from "@/components/visualizations/ArborArchitectureGraph";

export default function ArchitecturePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Arbor Architecture</h1>
      <div className="rounded-lg shadow-lg p-4">
        <ArborArchitectureGraph />
      </div>
    </div>
  );
}
