"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";

import { Message, useChat as useAiChat } from "ai/react";
// import { Models } from "@/types/models";
import { usePrivy } from "@privy-io/react-auth";
import { generateId } from "ai";
import ObjectId from "bson-objectid";
// import { useUserChats } from "@/hooks";

// import {
//   SOLANA_GET_WALLET_ADDRESS_NAME,
//   SOLANA_TRADE_NAME,
//   SOLANA_STAKE_NAME,
//   SOLANA_UNSTAKE_NAME,
//   SOLANA_TRANSFER_NAME,
//   SOLANA_DEPOSIT_LIQUIDITY_NAME,
//   SOLANA_WITHDRAW_LIQUIDITY_NAME,
// } from "@/ai/action-names";

import { useUserChats } from "@/lib/hooks/queries/chats";

export enum ColorMode {
  LIGHT = "light",
  DARK = "dark",
}

// Define a type for tool results
type ToolResult<T> = {
  message: string;
  body?: T;
};

interface ChatContextType {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  sendMessage: (message: string) => void;
  addToolResult: <T>(toolCallId: string, result: ToolResult<T>) => void;
  isResponseLoading: boolean;
  setChat: (chatId: string) => void;
  resetChat: () => void;
  chatId: string;
  inputDisabledMessage: string;
  setActiveNodeId: (nodeId: string | null) => void;
  setActiveEdgeIds: (edgeIds: string[]) => void;
  setSelectedAgent: (agent: { id: string; reason: string; } | null) => void;
  activeNodeId: string | null;
  activeEdgeIds: string[];
  selectedAgent: { id: string; reason: string; } | null;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  input: "",
  setInput: () => {},
  onSubmit: async () => {},
  isLoading: false,
  sendMessage: () => {},
  isResponseLoading: false,
  addToolResult: () => {},
  setChat: () => {},
  resetChat: () => {},
  chatId: "",
  inputDisabledMessage: "",
  setActiveNodeId: () => {},
  setActiveEdgeIds: () => {},
  setSelectedAgent: () => {},
  activeNodeId: null,
  activeEdgeIds: [],
  selectedAgent: null,
});

interface ChatProviderProps {
  children: ReactNode;
}

const agentNodes = ["sage", "muse", "herald", "chia", "clover", "amaranth"];

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { user, getAccessToken } = usePrivy();
  const [chatId, setChatId] = useState<string>(ObjectId().toString());
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [activeEdgeIds, setActiveEdgeIds] = useState<string[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<{
    id: string;
    reason: string;
  } | null>(null);

  const { mutate } = useUserChats();

  const setChat = async (chatId: string) => {
    setChatId(chatId);
    const chat = await fetch(`/api/chats/${chatId}`, {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });
    const chatData = await chat.json();
    if (chatData) {
      setMessages(chatData.messages);
    }
  };

  const resetChat = () => {
    setChatId(ObjectId().toString());
    setMessages([]);
  };

  const {
    messages,
    input,
    setInput,
    append,
    isLoading,
    addToolResult: addToolResultBase,
    setMessages,
  } = useAiChat({
    maxSteps: 20,
    onResponse: () => {
      setIsResponseLoading(false);
    },
    api: "/api/chat",
    body: {
      userId: user?.id,
      chatId,
    },
  });

  const addToolResult = <T,>(toolCallId: string, result: ToolResult<T>) => {
    addToolResultBase({
      toolCallId,
      result,
    });
  };

  useEffect(() => {
    const updateChat = async () => {
      console.log("updateChat");

      if (messages.length > 0 && !isLoading) {
        const response = await fetch(`/api/chats/${chatId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
          },
          body: JSON.stringify({
            messages,
          }),
        });
        const data = await response.json();
        if (typeof data === "object") {
          mutate();
        }
      }
    };

    updateChat();
  }, [isLoading]);

  const onSubmit = async () => {
    if (!input.trim()) return;
    setIsResponseLoading(true);

    // Randomly select an agent (temporary until all agents are implemented)
    const agentNodes = ["sage", "muse", "herald", "chia", "clover", "amaranth"];
    const randomAgent = agentNodes[Math.floor(Math.random() * agentNodes.length)];
    const edgeId = `e-arbor-${randomAgent}`;

    // Set visualization states
    setActiveNodeId("arbor");
    setActiveEdgeIds([edgeId]);
    setSelectedAgent({
      id: randomAgent,
      reason: `Selected based on capabilities`,
    });

    await append({
      role: "user",
      content: input,
    });
    setInput("");

    // Reset visualization states after delay
    setTimeout(() => {
      setActiveNodeId(null);
      setActiveEdgeIds([]);
      setSelectedAgent(null);
    }, 3000);
  };

  const sendMessage = async (message: string) => {
    setIsResponseLoading(true);
    await append({
      role: "user",
      content: message,
    });
  };

  const inputDisabledMessage = useMemo(() => {
    if (messages.length === 0) return "";
    const lastMessage = messages[messages.length - 1];
    let message = lastMessage.toolInvocations
      ?.map((toolInvocation) => {
        if (toolInvocation.state === "result") return "";
        const toolName = toolInvocation.toolName.slice(
          toolInvocation.toolName.indexOf("-") + 1
        );
        switch (toolName) {
          //   case SOLANA_TRADE_NAME:
          //     return `Complete or cancel your trade`;
          //   case SOLANA_TRANSFER_NAME:
          //     return `Complete or cancel your transfer`;
          //   case SOLANA_STAKE_NAME:
          //     return `Complete or cancel your stake`;
          //   case SOLANA_UNSTAKE_NAME:
          //     return `Complete or cancel your unstake`;
          //   case SOLANA_DEPOSIT_LIQUIDITY_NAME:
          //     return `Complete or cancel your deposit`;
          //   case SOLANA_WITHDRAW_LIQUIDITY_NAME:
          //     return `Complete or cancel your withdraw`;
          //   case SOLANA_GET_WALLET_ADDRESS_NAME:
          //     return `Connect your wallet`;
          default:
            return "";
        }
      })
      .filter((message) => message !== "")
      .join(" and ");
    if (message) {
      message = message?.concat(" to continue");
    }
    return message || "";
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        onSubmit,
        isLoading,
        sendMessage,
        isResponseLoading,
        addToolResult,
        setChat,
        resetChat,
        chatId,
        inputDisabledMessage,
        setActiveNodeId,
        setActiveEdgeIds,
        setSelectedAgent,
        activeNodeId,
        activeEdgeIds,
        selectedAgent,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
