import { RefObject } from "react";

export async function createRealtimeConnection(
  EPHEMERAL_KEY: string,
  audioElement: RefObject<HTMLAudioElement | null>,
  analyserRef: RefObject<AnalyserNode | null>,
  volumeIntervalRef: RefObject<number | null>,
  stream: MediaStream,
  setCurrentVolume: (volume: number) => void,
  getVolume: () => number
): Promise<{ pc: RTCPeerConnection; dc: RTCDataChannel }> {
  const pc = new RTCPeerConnection();
  // Handle incoming audio stream
  pc.ontrack = (e) => {
    if (audioElement.current) {
      audioElement.current.srcObject = e.streams[0];
    }
    // Optional: measure inbound volume
    const audioCtx = new (window.AudioContext || window.AudioContext)();
    const src = audioCtx.createMediaStreamSource(e.streams[0]);
    const inboundAnalyzer = audioCtx.createAnalyser();
    inboundAnalyzer.fftSize = 256;
    src.connect(inboundAnalyzer);
    analyserRef.current = inboundAnalyzer;

    // Start volume monitoring
    volumeIntervalRef.current = window.setInterval(() => {
      setCurrentVolume(getVolume());
    }, 50);
  };

  // Add the user's audio stream to the peer connection
  pc.addTrack(stream.getTracks()[0]);

  // Create a data channel for events
  const dc = pc.createDataChannel("oai-events");

  // Create an offer for the peer connection
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  const baseUrl = "https://api.openai.com/v1/realtime";
  const model = "gpt-4o-mini-realtime-preview-2024-12-17";
  const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
    method: "POST",
    body: offer.sdp,
    headers: {
      Authorization: `Bearer ${EPHEMERAL_KEY}`,
      "Content-Type": "application/sdp",
    },
  });

  // Create an answer for the peer connection
  const answerSdp = await sdpResponse.text();
  const answer: RTCSessionDescriptionInit = {
    type: "answer",
    sdp: answerSdp,
  };
  await pc.setRemoteDescription(answer);

  // Return the peer connection and data channel
  return { pc, dc };
}
