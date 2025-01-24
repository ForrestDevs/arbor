"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAI } from "@/components/ai/context";
import { LoggedEvent } from "@/lib/types/ai";

function Events() {
  const [prevEventLogs, setPrevEventLogs] = useState<LoggedEvent[]>([]);
  const eventLogsContainerRef = useRef<HTMLDivElement | null>(null);

  const { loggedEvents, toggleExpand } = useAI();

  const getDirectionArrow = (direction: string) => {
    if (direction === "client") return { symbol: "▲", color: "#7f5af0" };
    if (direction === "server") return { symbol: "▼", color: "#2cb67d" };
    return { symbol: "•", color: "#555" };
  };

  useEffect(() => {
    const hasNewEvent = loggedEvents.length > prevEventLogs.length;

    if (hasNewEvent && eventLogsContainerRef.current) {
      eventLogsContainerRef.current.scrollTop =
        eventLogsContainerRef.current.scrollHeight;
    }

    setPrevEventLogs(loggedEvents);
  }, [loggedEvents]);

  return (
    <div
      className={
        "w-full h-full overflow-auto transition-all rounded-xl duration-200 ease-in-out flex flex-col"
      }
      ref={eventLogsContainerRef}
    >
      <div>
        <div className="font-azeret font-semibold text-base px-6 py-4 sticky top-0 z-10  border-b bg-background">
          Logs
        </div>
        <div>
          {loggedEvents.map((log) => {
            const arrowInfo = getDirectionArrow(log.direction);
            const isError =
              log.eventName.toLowerCase().includes("error") ||
              log.eventData?.response?.status_details?.error != null;

            return (
              <div key={log.id} className="border-t py-2 px-6 font-mono">
                <div
                  onClick={() => toggleExpand(log.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center flex-1">
                    <span
                      style={{ color: arrowInfo.color }}
                      className="ml-1 mr-2"
                    >
                      {arrowInfo.symbol}
                    </span>
                    <span
                      className={
                        "flex-1 text-sm " +
                        (isError
                          ? "text-red-600"
                          : "text-gray-800 dark:text-gray-200")
                      }
                    >
                      {log.eventName}
                    </span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 ml-1 text-xs whitespace-nowrap">
                    {log.timestamp}
                  </div>
                </div>

                {log.expanded && log.eventData && (
                  <div className="text-gray-800 dark:text-gray-200 text-left">
                    <pre className="border-l-2 ml-1 border-gray-200 dark:border-gray-800 whitespace-pre-wrap break-words font-mono text-xs mb-2 mt-2 pl-2">
                      {JSON.stringify(log.eventData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Events;
