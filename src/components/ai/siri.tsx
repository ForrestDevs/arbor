"use client";

import React, { useState, useEffect } from "react";
import ReactSiriwave, { IReactSiriwaveProps } from "react-siriwave";
import { motion } from "framer-motion";
import { useAi } from "@/app/dashboard/chat/_components/context";

export function Siri() {
  const { isSessionActive, currentVolume } = useAi();

  const [siriWaveConfig, setSiriWaveConfig] = useState<IReactSiriwaveProps>({
    theme: "ios9",
    ratio: 1,
    speed: 5,
    amplitude: 25,
    frequency: 15,
    color: "#9E9E9E",
    cover: true,
    width: 300,
    height: 100,
    autostart: true,
    pixelDepth: 1,
    lerpSpeed: 0.1,
  });

  useEffect(() => {
    setSiriWaveConfig((prevConfig) => ({
      ...prevConfig,
      amplitude: isSessionActive
        ? currentVolume > 0.02
          ? currentVolume * 50
          : 0
        : 0,
      speed: isSessionActive
        ? currentVolume > 0.1
          ? currentVolume * 50
          : 0
        : 0,
      frequency: isSessionActive
        ? currentVolume > 0.01
          ? currentVolume * 50
          : 0
        : currentVolume > 0.5
        ? currentVolume * 100
        : 0,
    }));
  }, [currentVolume, isSessionActive]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6">
      <div className="flex items-center justify-center">
        <motion.div
          className="rounded-4xl p-4 overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginLeft: "10px" }}
        >
          <ReactSiriwave {...siriWaveConfig} />
        </motion.div>
      </div>
    </div>
  );
};