"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiViewProps {
  message: string;
  data?: {
    did_fire: boolean;
  };
}

export const ConfettiView: React.FC<ConfettiViewProps> = ({
  message,
  data,
}) => {
  useEffect(() => {
    if (data?.did_fire) {
      // Fire confetti from both sides
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ["#ff0000", "#00ff00", "#0000ff"],
            shapes: ["circle", "square"] as confetti.Shape[],
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ["#ff0000", "#00ff00", "#0000ff"],
            shapes: ["circle", "square"] as confetti.Shape[],
          })
        );
      }, 250);

      return () => clearInterval(interval);
    }
  }, [data?.did_fire]);

  return null; // This component doesn't render anything visible
}; 