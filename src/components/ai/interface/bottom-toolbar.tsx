import React from "react";
import { SessionStatus } from "@/lib/types/ai";
import { Button } from "@/components/ui/button";
import { useAI } from "../context";

interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
  isPTTActive: boolean;
  setIsPTTActive: (val: boolean) => void;
  isPTTUserSpeaking: boolean;
  handleTalkButtonDown: () => void;
  handleTalkButtonUp: () => void;
  isEventsPaneExpanded: boolean;
  setIsEventsPaneExpanded: (val: boolean) => void;
  isAudioPlaybackEnabled: boolean;
  setIsAudioPlaybackEnabled: (val: boolean) => void;
}

function BottomToolbar() {
  const {
    sessionStatus,
    onToggleConnection,
    isPTTActive,
    setIsPTTActive,
    isPTTUserSpeaking,
    handleTalkButtonDown,
    handleTalkButtonUp,
  } = useAI();
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";

  function getConnectionButtonLabel() {
    if (isConnected) return "Disconnect";
    if (isConnecting) return "Connecting...";
    return "Connect";
  }

  function getConnectionButtonClasses() {
    const baseClasses = "text-white text-base p-2 w-36 rounded-full h-full";
    const cursorClass = isConnecting ? "cursor-not-allowed" : "cursor-pointer";

    if (isConnected) {
      // Connected -> label "Disconnect" -> red
      return `bg-red-600 hover:bg-red-700 ${cursorClass} ${baseClasses}`;
    }
    // Disconnected or connecting -> label is either "Connect" or "Connecting" -> black
    return `bg-black hover:bg-gray-900 ${cursorClass} ${baseClasses}`;
  }

  const handleToggleConnection = () => {
    if (isConnected) {
      const audio = new Audio("/out.mp3");
      audio.play();
      onToggleConnection();
    } else {
      console.log("connecting");
      // const audio = new Audio("/in.mp3");
      // audio.play();
      onToggleConnection();
    }
  };

  return (
    <div className="p-4 flex flex-row items-center gap-4 sm:gap-x-8">
      <Button
        onClick={handleToggleConnection}
        className={getConnectionButtonClasses()}
        disabled={isConnecting}
      >
        {getConnectionButtonLabel()}
      </Button>

      <div className="flex flex-row items-center gap-2">
        <div className="relative inline-flex items-center">
          <input
            id="push-to-talk"
            type="checkbox"
            checked={isPTTActive}
            onChange={(e) => setIsPTTActive(e.target.checked)}
            disabled={!isConnected}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <label
            htmlFor="push-to-talk"
            className="ml-2 text-sm font-medium cursor-pointer select-none"
          >
            Push to talk
          </label>
        </div>
        <Button
          onMouseDown={handleTalkButtonDown}
          onMouseUp={handleTalkButtonUp}
          onTouchStart={handleTalkButtonDown}
          onTouchEnd={handleTalkButtonUp}
          disabled={!isPTTActive}
          className={`
            ${isPTTUserSpeaking ? "bg-gray-300" : "bg-gray-200"}
            ${!isPTTActive ? "bg-gray-100 text-gray-400" : ""}
            py-1 px-4 cursor-pointer rounded-full min-w-[60px] text-sm sm:text-base
          `}
        >
          Talk
        </Button>
      </div>

      {/* <div className="flex flex-row items-center gap-2">
        <input
          id="audio-playback"
          type="checkbox"
          checked={isAudioPlaybackEnabled}
          onChange={(e) => setIsAudioPlaybackEnabled(e.target.checked)}
          disabled={!isConnected}
          className="w-4 h-4"
        />
        <label
          htmlFor="audio-playback"
          className="flex items-center cursor-pointer"
        >
          Audio playback
        </label>
      </div> */}
    </div>
  );
}

export default BottomToolbar;
