"use client";

import {
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useState,
  RefObject,
  useRef,
} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  AgentConfig,
  LoggedEvent,
  ServerEvent,
  SessionStatus,
  TranscriptItem,
} from "@/lib/types/ai";
import { createRealtimeConnection } from "@/lib/services/realtime";
import { allAgentSets, defaultAgentSetKey } from "@/lib/agents";

interface EventContextValue {
  loggedEvents: LoggedEvent[];
  logClientEvent: (
    eventObj: Record<string, any>,
    eventNameSuffix?: string
  ) => void;
  logServerEvent: (
    eventObj: Record<string, any>,
    eventNameSuffix?: string
  ) => void;
  toggleExpand: (id: number | string) => void;
}

interface TranscriptContextValue {
  transcriptItems: TranscriptItem[];
  addTranscriptMessage: (
    itemId: string,
    role: "user" | "assistant",
    text: string,
    hidden?: boolean
  ) => void;
  updateTranscriptMessage: (
    itemId: string,
    text: string,
    isDelta: boolean
  ) => void;
  addTranscriptBreadcrumb: (title: string, data?: Record<string, any>) => void;
  addTranscriptUI: (title: string, data?: Record<string, any>) => void;
  toggleTranscriptItemExpand: (itemId: string) => void;
  updateTranscriptItemStatus: (
    itemId: string,
    newStatus: "IN_PROGRESS" | "DONE"
  ) => void;
}

interface ChatContextValue {
  selectedAgentName: string;
  setSelectedAgentName: (name: string) => void;
  selectedAgentConfigSet: AgentConfig[] | null;
  setSelectedAgentConfigSet: (config: AgentConfig[] | null) => void;

  dataChannel: RTCDataChannel | null;
  setDataChannel: (dataChannel: RTCDataChannel | null) => void;
  pcRef: RefObject<RTCPeerConnection | null>;
  dcRef: RefObject<RTCDataChannel | null>;
  audioElementRef: RefObject<HTMLAudioElement | null>;
  sessionStatus: SessionStatus;
  setSessionStatus: (status: SessionStatus) => void;

  isEventsPaneExpanded: boolean;
  setIsEventsPaneExpanded: (isExpanded: boolean) => void;
  userText: string;
  setUserText: (text: string) => void;
  isPTTActive: boolean;
  setIsPTTActive: (isActive: boolean) => void;
  isPTTUserSpeaking: boolean;
  setIsPTTUserSpeaking: (isSpeaking: boolean) => void;
  isAudioPlaybackEnabled: boolean;
  setIsAudioPlaybackEnabled: (isEnabled: boolean) => void;

  sendClientEvent: (eventObj: any, eventNameSuffix?: string) => void;
  updateSession: (shouldTriggerResponse?: boolean) => void;
  connectToRealtime: () => void;
  disconnectFromRealtime: () => void;
  sendSimulatedUserMessage: (text: string) => void;
  cancelAssistantSpeech: () => void;
  handleSendTextMessage: () => void;
  handleTalkButtonDown: () => void;
  handleTalkButtonUp: () => void;
  onToggleConnection: () => void;

  currentVolume: number;
  setCurrentVolume: (volume: number) => void;
}

interface AIContextValue
  extends ChatContextValue,
    EventContextValue,
    TranscriptContextValue {}

const AIContext = createContext<AIContextValue | undefined>(undefined);

export const AIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedAgentName, setSelectedAgentName] = useState<string>(
    allAgentSets[defaultAgentSetKey][0].name
  );
  const [selectedAgentConfigSet, setSelectedAgentConfigSet] = useState<
    AgentConfig[] | null
  >(allAgentSets[defaultAgentSetKey]);

  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [sessionStatus, setSessionStatus] =
    useState<SessionStatus>("DISCONNECTED");

  const [isEventsPaneExpanded, setIsEventsPaneExpanded] =
    useState<boolean>(true);
  const [userText, setUserText] = useState<string>("");
  const [isPTTActive, setIsPTTActive] = useState<boolean>(true);
  const [isPTTUserSpeaking, setIsPTTUserSpeaking] = useState<boolean>(false);
  const [isAudioPlaybackEnabled, setIsAudioPlaybackEnabled] =
    useState<boolean>(true);

  const [loggedEvents, setLoggedEvents] = useState<LoggedEvent[]>([]);
  const [transcriptItems, setTranscriptItems] = useState<TranscriptItem[]>([]);

  // Audio references for local mic
  // Approach A: explicitly typed as HTMLDivElement | null
  const audioIndicatorRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // Volume analysis (assistant inbound audio)
  const [currentVolume, setCurrentVolume] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const volumeIntervalRef = useRef<number | null>(null);

  const isConnectingRef = useRef<boolean>(false);
  /**
   * We track only the ephemeral user message **ID** here.
   * While user is speaking, we update that conversation item by ID.
   */
  const ephemeralUserMessageIdRef = useRef<string | null>(null);

  function addLoggedEvent(
    direction: "client" | "server",
    eventName: string,
    eventData: Record<string, any>
  ) {
    const id = eventData.event_id || uuidv4();
    setLoggedEvents((prev) => [
      ...prev,
      {
        id,
        direction,
        eventName,
        eventData,
        timestamp: new Date().toLocaleTimeString(),
        expanded: false,
      },
    ]);
  }

  const handleFunctionCall = async (functionCallParams: {
    name: string;
    call_id?: string;
    arguments: string;
  }) => {
    const args = JSON.parse(functionCallParams.arguments);
    const currentAgent = selectedAgentConfigSet?.find(
      (a) => a.name === selectedAgentName
    );

    

    addTranscriptBreadcrumb(`function call: ${functionCallParams.name}`, args);

    if (currentAgent?.toolLogic?.[functionCallParams.name]) {
      const fn = currentAgent.toolLogic[functionCallParams.name];
      const fnResult = await fn(args, transcriptItems, addTranscriptUI);
      addTranscriptBreadcrumb(
        `function call result: ${functionCallParams.name}`,
        fnResult
      );

      addTranscriptUI(`${functionCallParams.name}`, fnResult);

      sendClientEvent({
        type: "conversation.item.create",

        item: {
          type: "function_call_output",
          call_id: functionCallParams.call_id,
          output: JSON.stringify(fnResult),
        },
      });
      sendClientEvent({ type: "response.create" });
    } else if (currentAgent?.uiComponents?.[functionCallParams.name]) {
      addTranscriptUI(`${functionCallParams.name}`, args);
    } else if (functionCallParams.name === "transferAgents") {
      addTranscriptUI(`${functionCallParams.name}`, args);

      console.log("transferAgents: ", args);
      const destinationAgent = args.destination_agent;
      const newAgentConfig =
        selectedAgentConfigSet?.find((a) => a.name === destinationAgent) ||
        null;
      if (newAgentConfig) {
        setSelectedAgentName(destinationAgent);
      }
      const functionCallOutput = {
        destination_agent: destinationAgent,
        did_transfer: !!newAgentConfig,
      };
      sendClientEvent({
        type: "conversation.item.create",
        item: {
          type: "function_call_output",
          call_id: functionCallParams.call_id,
          output: JSON.stringify(functionCallOutput),
        },
      });
      addTranscriptBreadcrumb(
        `function call: ${functionCallParams.name} response`,
        functionCallOutput
      );
    } else {
      const simulatedResult = { result: true };
      addTranscriptBreadcrumb(
        `function call fallback: ${functionCallParams.name}`,
        simulatedResult
      );

      sendClientEvent({
        type: "conversation.item.create",
        item: {
          type: "function_call_output",
          call_id: functionCallParams.call_id,
          output: JSON.stringify(simulatedResult),
        },
      });
      sendClientEvent({ type: "response.create" });
    }
  };

  const handleServerEvent = (serverEvent: ServerEvent) => {
    logServerEvent(serverEvent);

    switch (serverEvent.type) {
      case "session.created": {
        if (serverEvent.session?.id) {
          setSessionStatus("CONNECTED");
          addTranscriptBreadcrumb(
            `session.id: ${
              serverEvent.session.id
            }\nStarted at: ${new Date().toLocaleString()}`
          );
          // Configure the agent
          configureAgent();
          // Get the agent to introduce itself
          sendClientEvent({ type: "response.create" });
        }

        break;
      }

      /**
       * User speech started
       */
      case "input_audio_buffer.speech_started": {
        getOrCreateEphemeralUserId();
        updateEphemeralUserMessage({ status: "IN_PROGRESS" });
        break;
      }

      /**
       * User speech stopped
       */
      case "input_audio_buffer.speech_stopped": {
        // optional: you could set "stopped" or just keep "speaking"
        updateEphemeralUserMessage({ status: "IN_PROGRESS" });
        break;
      }

      /**
       * Audio buffer committed => "Processing speech..."
       */
      case "input_audio_buffer.committed": {
        updateEphemeralUserMessage({
          title: "Processing speech...",
          status: "IN_PROGRESS",
        });
        break;
      }

      /**
       * Partial user transcription
       */
      case "conversation.item.input_audio_transcription": {
        const partialText =
          serverEvent.transcript ?? serverEvent.delta ?? "User is speaking...";
        updateEphemeralUserMessage({
          title: partialText,
          status: "IN_PROGRESS",
        });
        break;
      }

      case "conversation.item.created": {
        let text =
          serverEvent.item?.content?.[0]?.text ||
          serverEvent.item?.content?.[0]?.transcript ||
          "";
        const role = serverEvent.item?.role as "user" | "assistant";
        const itemId = serverEvent.item?.id;

        if (itemId && transcriptItems.some((item) => item.itemId === itemId)) {
          break;
        }

        if (itemId && role) {
          if (role === "user" && !text) {
            text = "[Transcribing...]";
          }
          addTranscriptMessage(itemId, role, text);
        }
        break;
      }

      case "conversation.item.input_audio_transcription.completed": {
        const itemId = serverEvent.item_id;
        const finalTranscript =
          !serverEvent.transcript || serverEvent.transcript === "\n"
            ? "[inaudible]"
            : serverEvent.transcript;
        if (itemId) {
          updateTranscriptMessage(itemId, finalTranscript, false);
        }
        break;
      }

      case "response.audio_transcript.delta": {
        const itemId = serverEvent.item_id;
        const deltaText = serverEvent.delta || "";
        if (itemId) {
          updateTranscriptMessage(itemId, deltaText, true);
        }
        break;
      }

      case "response.function_call_arguments.done": {
        const itemId = serverEvent.item_id;
        const deltaText = serverEvent.delta || "";
        console.log("function call arguments done: ", deltaText);
        if (itemId) {
          updateTranscriptMessage(itemId, deltaText, true);
        }
        break;
      }

      case "response.done": {
        if (serverEvent.response?.output) {
          serverEvent.response.output.forEach((outputItem) => {
            if (
              outputItem.type === "function_call" &&
              outputItem.name &&
              outputItem.arguments
            ) {
              console.log("function call detected running: ", outputItem.name);
              handleFunctionCall({
                name: outputItem.name,
                call_id: outputItem.call_id,
                arguments: outputItem.arguments,
              });
            }
          });
        }
        break;
      }

      case "response.output_item.done": {
        const itemId = serverEvent.item?.id;
        if (itemId) {
          updateTranscriptItemStatus(itemId, "DONE");
        }
        break;
      }

      default:
        break;
    }
  };

  const sendClientEvent = (eventObj: any, eventNameSuffix = "") => {
    if (dcRef.current && dcRef.current.readyState === "open") {
      logClientEvent(eventObj, eventNameSuffix);
      dcRef.current.send(JSON.stringify(eventObj));
    } else {
      logClientEvent(
        { attemptedEvent: eventObj.type },
        "error.data_channel_not_open"
      );
      console.error(
        "Failed to send message - no data channel available",
        eventObj
      );
    }
  };

  const logClientEvent: EventContextValue["logClientEvent"] = (
    eventObj,
    eventNameSuffix = ""
  ) => {
    const name = `${eventObj.type || ""} ${eventNameSuffix || ""}`.trim();
    addLoggedEvent("client", name, eventObj);
  };

  const logServerEvent: EventContextValue["logServerEvent"] = (
    eventObj,
    eventNameSuffix = ""
  ) => {
    const name = `${eventObj.type || ""} ${eventNameSuffix || ""}`.trim();
    addLoggedEvent("server", name, eventObj);
  };

  function newTimestampPretty(): string {
    return new Date().toLocaleTimeString([], {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  const addTranscriptMessage: TranscriptContextValue["addTranscriptMessage"] = (
    itemId,
    role,
    text = "",
    isHidden = false
  ) => {
    setTranscriptItems((prev) => {
      if (prev.some((log) => log.itemId === itemId && log.type === "MESSAGE")) {
        console.warn(
          `[addTranscriptMessage] skipping; message already exists for itemId=${itemId}, role=${role}, text=${text}`
        );
        return prev;
      }

      const newItem: TranscriptItem = {
        itemId,
        type: "MESSAGE",
        role,
        title: text,
        expanded: false,
        timestamp: newTimestampPretty(),
        createdAtMs: Date.now(),
        status: "IN_PROGRESS",
        isHidden,
      };

      return [...prev, newItem];
    });
  };

  const updateTranscriptMessage: TranscriptContextValue["updateTranscriptMessage"] =
    (itemId, newText, append = false) => {
      setTranscriptItems((prev) =>
        prev.map((item) => {
          if (item.itemId === itemId && item.type === "MESSAGE") {
            return {
              ...item,
              title: append ? (item.title ?? "") + newText : newText,
            };
          }
          return item;
        })
      );
    };

  const addTranscriptBreadcrumb: TranscriptContextValue["addTranscriptBreadcrumb"] =
    (title, data) => {
      setTranscriptItems((prev) => [
        ...prev,
        {
          itemId: `breadcrumb-${uuidv4()}`,
          type: "BREADCRUMB",
          title,
          data,
          expanded: false,
          timestamp: newTimestampPretty(),
          createdAtMs: Date.now(),
          status: "DONE",
          isHidden: false,
        },
      ]);
    };

  const addTranscriptUI: TranscriptContextValue["addTranscriptUI"] = (
    title,
    data
  ) => {
    console.log("adding ui: ", title, data);
    setTranscriptItems((prev) => [
      ...prev,
      {
        itemId: `ui-${uuidv4()}`,
        type: "UI",
        title,
        data,
        expanded: false,
        timestamp: newTimestampPretty(),
        createdAtMs: Date.now(),
        status: "DONE",
        isHidden: false,
      },
    ]);
  };

  const toggleTranscriptItemExpand: TranscriptContextValue["toggleTranscriptItemExpand"] =
    (itemId) => {
      setTranscriptItems((prev) =>
        prev.map((log) =>
          log.itemId === itemId ? { ...log, expanded: !log.expanded } : log
        )
      );
    };

  const updateTranscriptItemStatus: TranscriptContextValue["updateTranscriptItemStatus"] =
    (itemId, newStatus) => {
      setTranscriptItems((prev) =>
        prev.map((item) =>
          item.itemId === itemId ? { ...item, status: newStatus } : item
        )
      );
    };

  const toggleExpand: EventContextValue["toggleExpand"] = (id) => {
    setLoggedEvents((prev) =>
      prev.map((log) => {
        if (log.id === id) {
          return { ...log, expanded: !log.expanded };
        }
        return log;
      })
    );
  };

  /**
   * Return an ephemeral user ID, creating a new ephemeral message in conversation if needed.
   */
  function getOrCreateEphemeralUserId(): string {
    let ephemeralId = ephemeralUserMessageIdRef.current;
    if (!ephemeralId) {
      // Use uuidv4 for a robust unique ID
      ephemeralId = uuidv4();
      ephemeralUserMessageIdRef.current = ephemeralId;

      const newMessage: TranscriptItem = {
        itemId: ephemeralId,
        type: "MESSAGE",
        role: "user",
        title: "",
        data: {},
        expanded: false,
        timestamp: new Date().toISOString(),
        createdAtMs: Date.now(),
        status: "IN_PROGRESS",
        isHidden: true,
      };

      // Append the ephemeral item to conversation
      setTranscriptItems((prev) => [...prev, newMessage]);
    }
    return ephemeralId;
  }

  /**
   * Update the ephemeral user message (by ephemeralUserMessageIdRef) with partial changes.
   */
  function updateEphemeralUserMessage(partial: Partial<TranscriptItem>) {
    const ephemeralId = ephemeralUserMessageIdRef.current;
    if (!ephemeralId) return; // no ephemeral user message to update

    setTranscriptItems((prev) =>
      prev.map((item) => {
        if (item.itemId === ephemeralId) {
          return { ...item, ...partial };
        }
        return item;
      })
    );
  }

  /**
   * Clear ephemeral user message ID so the next user speech starts fresh.
   */
  function clearEphemeralUserMessage() {
    ephemeralUserMessageIdRef.current = null;
  }

  const fetchEphemeralKey = async (): Promise<string | null> => {
    try {
      logClientEvent({ url: "/api/session" }, "fetch_session_token_request");
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to get ephemeral token: ${response.status}`);
      }
      const data = await response.json();
      logServerEvent(data, "fetch_session_token_response");
      if (!data.client_secret?.value) {
        logClientEvent(data, "error.no_ephemeral_key");
        console.error("No ephemeral key provided by the server");
        setSessionStatus("DISCONNECTED");
        return null;
      }
      console.log("ephemeral key: ", data.client_secret.value);
      return data.client_secret.value;
    } catch (err) {
      console.error("getEphemeralToken error:", err);
      throw err;
    }
  };

  const configureAgent = () => {
    const currentAgent = selectedAgentConfigSet?.find(
      (a) => a.name === selectedAgentName
    );
    const instructions = currentAgent?.instructions || "";
    const tools = currentAgent?.tools || [];

    const sessionUpdate = {
      type: "session.update",
      session: {
        instructions: instructions,
        tools: tools || [],
        tool_choice: "auto",
      },
    };
    sendClientEvent(sessionUpdate, "configure arbor tools");
  };

  const connectToRealtime = async () => {
    if (isConnectingRef.current) return;
    isConnectingRef.current = true;
    setSessionStatus("CONNECTING");

    try {
      const EPHEMERAL_KEY = await fetchEphemeralKey();
      if (!EPHEMERAL_KEY) {
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setupAudioVisualization(stream);

      if (!audioElementRef.current) {
        audioElementRef.current = document.createElement("audio");
      }
      audioElementRef.current.autoplay = isAudioPlaybackEnabled;

      if (audioContextRef.current) {
        const audio = new Audio("/in.mp3");
        const source = audioContextRef.current.createMediaElementSource(audio);
        source.connect(audioContextRef.current.destination);
        audio.play();
      }

      const { pc, dc } = await createRealtimeConnection(
        EPHEMERAL_KEY,
        audioElementRef,
        analyserRef,
        volumeIntervalRef,
        stream,
        setCurrentVolume,
        getVolume
      );
      pcRef.current = pc;
      dcRef.current = dc;

      dc.onopen = () => {
        logClientEvent({}, "data_channel.open");
      };
      dc.onclose = () => {
        logClientEvent({}, "data_channel.close");
      };
      dc.onmessage = (e: MessageEvent) => {
        handleServerEvent(JSON.parse(e.data));
      };
      dc.onerror = (err: any) => {
        logClientEvent({ error: err }, "data_channel.error");
      };

      setDataChannel(dc);
    } catch (err) {
      console.error("Error connecting to realtime:", err);
      setSessionStatus("DISCONNECTED");
    } finally {
      console.log("finally");
      isConnectingRef.current = false;
    }
  };

  const disconnectFromRealtime = () => {
    if (pcRef.current) {
      pcRef.current.getSenders().forEach((sender) => {
        if (sender.track) {
          sender.track.stop();
        }
      });

      pcRef.current.close();
      pcRef.current = null;
    }
    if (dcRef.current) {
      dcRef.current.close();
      dcRef.current = null;
    }
    setDataChannel(null);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    if (audioIndicatorRef.current) {
      audioIndicatorRef.current.classList.remove("active");
    }
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    analyserRef.current = null;

    setCurrentVolume(0);
    setSessionStatus("DISCONNECTED");
    setIsPTTUserSpeaking(false);
    logClientEvent({}, "disconnected");
  };

  /**
   * Sets up a local audio visualization for mic input (toggle wave CSS).
   */
  const setupAudioVisualization = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    source.connect(analyzer);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateIndicator = () => {
      if (!audioContext) return;
      analyzer.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;

      // Toggle an "active" class if volume is above a threshold
      if (audioIndicatorRef.current) {
        audioIndicatorRef.current.classList.toggle("active", average > 30);
      }
      requestAnimationFrame(updateIndicator);
    };
    updateIndicator();

    audioContextRef.current = audioContext;
  };

  /**
   * Calculate RMS volume from inbound assistant audio
   */
  const getVolume = (): number => {
    if (!analyserRef.current) return 0;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const float = (dataArray[i] - 128) / 128;
      sum += float * float;
    }
    return Math.sqrt(sum / dataArray.length);
  };

  const sendSimulatedUserMessage = (text: string) => {
    const id = uuidv4().slice(0, 32);
    addTranscriptMessage(id, "user", text, true);

    sendClientEvent(
      {
        type: "conversation.item.create",
        item: {
          id,
          type: "message",
          role: "user",
          content: [{ type: "input_text", text }],
        },
      },
      "(simulated user text message)"
    );
    sendClientEvent(
      { type: "response.create" },
      "(trigger response after simulated user text message)"
    );
  };

  const updateSession = (shouldTriggerResponse: boolean = false) => {
    sendClientEvent(
      { type: "input_audio_buffer.clear" },
      "clear audio buffer on session update"
    );

    const currentAgent = selectedAgentConfigSet?.find(
      (a) => a.name === selectedAgentName
    );

    const turnDetection = isPTTActive
      ? null
      : {
          type: "server_vad",
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 200,
          create_response: true,
        };

    const instructions = currentAgent?.instructions || "";
    const tools = currentAgent?.tools || [];

    const sessionUpdateEvent = {
      type: "session.update",
      session: {
        modalities: ["text", "audio"],
        instructions,
        voice: "echo",
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        input_audio_transcription: { model: "whisper-1" },
        turn_detection: turnDetection,
        tools,
      },
    };

    sendClientEvent(sessionUpdateEvent);

    if (shouldTriggerResponse) {
      sendSimulatedUserMessage("hi");
    }
  };

  const cancelAssistantSpeech = async () => {
    const mostRecentAssistantMessage = [...transcriptItems]
      .reverse()
      .find((item) => item.role === "assistant");

    if (!mostRecentAssistantMessage) {
      console.warn("can't cancel, no recent assistant message found");
      return;
    }
    if (mostRecentAssistantMessage.status === "DONE") {
      console.log("No truncation needed, message is DONE");
      return;
    }

    sendClientEvent({
      type: "conversation.item.truncate",
      item_id: mostRecentAssistantMessage?.itemId,
      content_index: 0,
      audio_end_ms: Date.now() - mostRecentAssistantMessage.createdAtMs,
    });
    sendClientEvent(
      { type: "response.cancel" },
      "(cancel due to user interruption)"
    );
  };

  const handleSendTextMessage = () => {
    if (!userText.trim()) return;
    cancelAssistantSpeech();

    sendClientEvent(
      {
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: userText.trim() }],
        },
      },
      "(send user text message)"
    );
    setUserText("");

    sendClientEvent({ type: "response.create" }, "trigger response");
  };

  const handleTalkButtonDown = () => {
    if (sessionStatus !== "CONNECTED" || dataChannel?.readyState !== "open")
      return;
    cancelAssistantSpeech();

    setIsPTTUserSpeaking(true);
    sendClientEvent({ type: "input_audio_buffer.clear" }, "clear PTT buffer");
  };

  const handleTalkButtonUp = () => {
    if (
      sessionStatus !== "CONNECTED" ||
      dataChannel?.readyState !== "open" ||
      !isPTTUserSpeaking
    )
      return;

    setIsPTTUserSpeaking(false);
    sendClientEvent({ type: "input_audio_buffer.commit" }, "commit PTT");
    sendClientEvent({ type: "response.create" }, "trigger response PTT");
  };

  const onToggleConnection = async () => {
    if (sessionStatus === "CONNECTED" || sessionStatus === "CONNECTING") {
      disconnectFromRealtime();
      setSessionStatus("DISCONNECTED");
    } else {
      console.log("connectingToggle");
      connectToRealtime();
    }
  };

  return (
    <AIContext.Provider
      value={{
        userText,
        setUserText,
        selectedAgentName,
        setSelectedAgentName,
        selectedAgentConfigSet,
        setSelectedAgentConfigSet,
        transcriptItems,
        addTranscriptMessage,
        updateTranscriptMessage,
        addTranscriptBreadcrumb,
        addTranscriptUI,
        updateTranscriptItemStatus,
        isEventsPaneExpanded,
        setIsEventsPaneExpanded,
        loggedEvents,
        logServerEvent,
        logClientEvent,
        isPTTActive,
        setIsPTTActive,
        isPTTUserSpeaking,
        setIsPTTUserSpeaking,
        isAudioPlaybackEnabled,
        setIsAudioPlaybackEnabled,
        dataChannel,
        setDataChannel,
        pcRef,
        dcRef,
        audioElementRef,
        sessionStatus,
        sendClientEvent,
        toggleTranscriptItemExpand,
        setSessionStatus,
        toggleExpand,
        connectToRealtime,
        disconnectFromRealtime,
        updateSession,
        sendSimulatedUserMessage,
        cancelAssistantSpeech,
        handleSendTextMessage,
        handleTalkButtonDown,
        handleTalkButtonUp,
        onToggleConnection,
        currentVolume,
        setCurrentVolume,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
}
