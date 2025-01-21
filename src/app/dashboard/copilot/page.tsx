"use client";

import React, { useEffect, useState } from "react";
import { useAi } from "@/components/ai/provider";
import { Siri } from "@/components/ai/siri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircleIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import AbstractBall from "@/components/ai/blob";
import { MicIcon, PhoneOff } from "lucide-react";
import Transcriber from "@/components/ai/transcriptions";

const voiceCommands = [
  "Hey Arbor, what's the weather?",
  "Hey Arbor, tell me a joke",
  "Hey Arbor, what time is it?",
  "Hey Arbor, set a reminder",
  "Hey Arbor, play some music",
];

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    "Session established successfully!": "Connected",
    "Initializing...": "Initializing",
    "Connecting...": "Connecting",
    "Session stopped": "Disconnected",
    "": "Disconnected",
    Error: "Error",
  };

  return statusMap[status] || status;
};

const globConfig = {
  perlinTime: 50.0,
  perlinDNoise: 2.5,
  chromaRGBr: 7.5,
  chromaRGBg: 5,
  chromaRGBb: 7,
  chromaRGBn: 0,
  chromaRGBm: 1.0,
  sphereWireframe: false,
  spherePoints: false,
  spherePsize: 1.0,
  cameraSpeedY: 0.0,
  cameraSpeedX: 0.0,
  cameraZoom: 175,
  cameraGuide: false,
  perlinMorph: 5.5,
};

export default function Copilot() {
  const {
    messages,
    conversation,
    msgs,
    status,
    currentVolume,
    isSessionActive,
    handleStartStopClick,
  } = useAi();

  const [config, setConfig] = useState(globConfig);

  useEffect(() => {
    if (!isSessionActive) {
      setConfig(globConfig);
      return;
    }
    // Only update when volume changes and session is active
    if (isSessionActive && currentVolume > 0.01) {
      setConfig({
        ...globConfig,
        perlinTime: 20.0,
        perlinMorph: 25.0,
      });
    } else {
      setConfig({
        ...globConfig,
      });
    }
  }, [isSessionActive, currentVolume]);

  console.log(status);

  return (
    <div className="h-full w-full flex flex-col items-center relative">
      {/* Connection Status Badge */}
      <motion.div
        className="absolute top-4 left-4 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Badge
          variant={isSessionActive ? "default" : "destructive"}
          className="transition-colors duration-200"
        >
          {getStatusText(status)}
        </Badge>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <HelpCircleIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium leading-none">Voice Commands</h4>
              <p className="text-sm text-muted-foreground">
                Try these example voice commands:
              </p>
              <div className="space-y-2">
                {voiceCommands.map((command) => (
                  <div
                    key={command}
                    className="text-sm rounded-md bg-muted p-2"
                  >
                    {command}
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </motion.div>

      <div className="flex flex-col items-center gap-2 absolute top-4">
        <Button
          className="rounded-full bg-primary text-primary-foreground"
          variant="outline"
          onClick={handleStartStopClick}
        >
          {isSessionActive ? <PhoneOff size={18} /> : <MicIcon size={18} />}
        </Button>
        {!isSessionActive && (
          <p className="text-sm text-muted-foreground">
            Click to start the voice assistant
          </p>
        )}
      </div>

      <div className="h-full w-full flex flex-col justify-between max-w-full md:max-w-4xl">
        <div className="flex-1 h-0 flex flex-col items-center justify-center gap-8">
          <AbstractBall {...config} />
          <AnimatePresence>
            {isSessionActive && <Transcriber conversation={conversation} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
