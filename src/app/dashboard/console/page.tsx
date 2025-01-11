"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";

export default function ConsolePage() {
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const generateSystemLogs = () => {
    const actions = [
      "Analyzing narrative structure with SAGE.ANALYZER...",
      "Evaluating character arcs with MUSE.CREATOR...",
      "Processing story themes with HERALD.PROCESSOR...",
      "Generating dialogue options with DIALOGUE.GENERATE...",
      "Analyzing plot coherence with STORY.EVALUATE...",
      "Creating character profiles with CHARACTER.CREATE...",
      "Tracking social engagement metrics with ENGAGEMENT.TRACK...",
      "Managing network connections with NETWORK.MANAGE...",
      "Discovering narrative patterns with NARRATIVE.ANALYZE...",
      "Validating story elements with ARBOR.CORE..."
    ];

    const tools = [
      "SAGE.ANALYZER",
      "MUSE.CREATOR",
      "HERALD.PROCESSOR",
      "ARBOR.CORE",
      "CHIA.ANALYZER", 
      "CLOVER.CREATOR",
      "AMARANTH.PROCESSOR",
      "NARRATIVE.ANALYZE",
      "STORY.EVALUATE",
      "CHARACTER.CREATE",
      "DIALOGUE.GENERATE",
      "SOCIAL.POST",
      "ENGAGEMENT.TRACK",
      "SYSTEM.CONTROL",
      "NETWORK.MANAGE",
      "PORTFOLIO.MANAGE",
      "TOKEN.TRACK",
      "GEM.DISCOVER", 
      "PROJECT.ANALYZE",
      "TAX.CALCULATE",
      "TRADE.ANALYZE"
    ];

    const generateInsight = () => {
      const subjects = ["character motivation", "plot structure", "thematic elements", "narrative pacing", "dialogue patterns", "story arc", "world-building details", "character relationships", "symbolic imagery", "emotional resonance"];
      const verbs = ["Detected", "Identified", "Analyzed", "Discovered", "Recognized", "Mapped", "Evaluated", "Found", "Observed", "Extracted"];
      const qualities = ["emerging", "complex", "subtle", "recurring", "underlying", "potential", "distinctive", "significant", "unique", "key"];
      
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      const quality = qualities[Math.floor(Math.random() * qualities.length)];

      return `${verb} ${quality} ${subject}`;
    };

    const insights = Array(5).fill(null).map(() => generateInsight());

    return {
      actions,
      tools, 
      insights
    };
  };

  useEffect(() => {
    // Initial system boot sequence
    const bootSequence = [
      "Initializing Intel SGX TEE environment v2.4.1...",
      "Loading secure memory enclave at 0x7fff8000...", 
      "Verifying TPM attestation and system integrity...",
      "Establishing encrypted TLS 1.3 channels on ports 443,8443...",
      "Initializing Arbor AI core system v1.2.3...",
      "Loading PyTorch compute frameworks and CUDA drivers...",
      "Calibrating transformer attention layers and weights...",
      "System ready - Arbor AI v1.2.3 active (PID: 1337)"
    ];

    // Add boot sequence
    let index = 0;
    const bootInterval = setInterval(() => {
      if (index < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[index]]);
        index++;
      } else {
        clearInterval(bootInterval);
        startMainLoop();
      }
    }, Math.floor(Math.random() * (4000 - 1500 + 1) + 1500));

    // Main processing loop
    const startMainLoop = () => {
      const { actions, tools, insights } = generateSystemLogs();
      
      const mainInterval = setInterval(() => {
        const rand = Math.random();
        let newLog = "";

        if (rand < 0.4) {
          // Select random action and find matching tool
          const actionIndex = Math.floor(Math.random() * actions.length);
          const action = actions[actionIndex];
          const actionType = action.split('.')[1]; // Get the type after the dot
          const matchingTools = tools.filter(tool => tool.includes(actionType));
          const tool = matchingTools[Math.floor(Math.random() * matchingTools.length)];
          
          newLog = `[ARBOR] ${action}\n[SYSTEM] Selected tool: ${tool}`;
        } else {
          newLog = `[INSIGHT] ${insights[Math.floor(Math.random() * insights.length)]}`;
        }

        setLogs(prev => [...prev, newLog]);
      }, Math.floor(Math.random() * (3000 - 800) + 800)); // Random delay between 800ms and 3000ms

      return mainInterval;
    };

    return () => {
      clearInterval(bootInterval);
      clearInterval(startMainLoop());
    };
  }, []);

  // Auto-scroll to bottom when new logs appear
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4 font-azeret">
        <Terminal className="w-5 h-5" />
        <h1 className="text-xl font-bold">Arbor System Console</h1>
      </div>

      <div className="bg-background border border-border p-4 rounded-lg font-mono h-[80vh] overflow-y-auto dark:bg-black">
        {logs.map((log, i) => (
          <div key={i} className="mb-1 text-emerald-600 dark:text-green-500">
            <span className="text-muted-foreground">[{new Date().toLocaleTimeString()}]</span> {log}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
