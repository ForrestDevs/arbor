"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAI } from "../context";

const Ring: React.FC = () => {
  const { currentVolume, sessionStatus } = useAI();

  const isSessionActive = sessionStatus === "CONNECTED";

  // Initialize with empty array to avoid hydration mismatch
  const [waveData, setWaveData] = useState<number[]>([]);

  // Generate initial wave data on mount
  useEffect(() => {
    setWaveData(Array(100).fill(30));
  }, []);

  useEffect(() => {
    if (isSessionActive) {
      updateWave(currentVolume);
    } else {
      resetWave();
    }
  }, [currentVolume, isSessionActive]);

  const updateWave = (volume: number) => {
    setWaveData(
      Array(100)
        .fill(0)
        .map(() => Math.sin(Math.random() * Math.PI * 2) * volume * 30 + 30)
    );
  };

  const resetWave = () => {
    setWaveData(Array(100).fill(30));
  };

  const generateGradient = () => {
    return (
      <defs>
        <radialGradient id="gradientId" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7DF9FF" />
          <stop offset="100%" stopColor="#00BFFF" />
        </radialGradient>
      </defs>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="relative flex items-center justify-center w-full h-full overflow-clip"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center">
          <motion.img
            src="/arbor2.png"
            alt="AI Assistant"
            className="absolute object-cover rounded-full"
            style={{
              filter: isSessionActive
                ? "saturate(1) brightness(1)"
                : "saturate(0) brightness(0.5)",
            }}
            animate={{
              filter: isSessionActive
                ? "saturate(1) brightness(1)"
                : "saturate(0) brightness(0.5)",
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* {generateGradient()} */}
            {/* <circle cx="100" cy="100" r="180" fill="url(#gradientId)" /> */}
            {waveData.map((radius, index) => {
              const angle = (index / waveData.length) * 360;
              const radians = (angle * Math.PI) / 180;
              const x =
                Math.round((100 + Math.cos(radians) * (radius * 2)) * 1000) /
                1000;
              const y =
                Math.round((100 + Math.sin(radians) * (radius * 2)) * 1000) /
                1000;

              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="1"
                  fill="#e6f7ff"
                  opacity={isSessionActive ? 0.8 : 0}
                />
              );
            })}
          </motion.svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Ring;
