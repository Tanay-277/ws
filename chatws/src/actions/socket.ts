import type { Message } from "../types";

interface SocketMessage {
  type: "message" | "user_joined" | "user_left" | "error";
  payload: any;
}

const connectSocket = () => {
  const socket = new WebSocket("ws://localhost:8000");
  return socket;
};

export const sendMessage = (socket: WebSocket, message: string) => {
  if (socket.readyState === WebSocket.OPEN) {
    const socketMessage: SocketMessage = {
      type: "message",
      payload: {
        text: message,
        timestamp: new Date().toISOString(),
      },
    };
    socket.send(JSON.stringify(socketMessage));
    return true;
  }
  return false;
};

export const parseMessage = (data: string): Message | null => {
  try {
    const parsed = JSON.parse(data) as SocketMessage;
    
    if (parsed.type === "message") {
      return {
        text: parsed.payload.text,
        timestamp: new Date(parsed.payload.timestamp),
        isUser: false,
        userName: parsed.payload.userName || "Unknown",
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error parsing socket message:", error);
    return null;
  }
};

export default connectSocket;
