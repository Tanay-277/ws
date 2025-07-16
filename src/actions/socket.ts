import type { Message } from "../types";

interface SocketMessage {
	type: "message" | "join" | "left" | "error" | "create";
	payload: any;
}

const connectSocket = () => {
	const socket = new WebSocket("ws://localhost:8080");
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
		
		switch (parsed.type) {
			case "message":
				return {
					type: parsed.type,
					text: parsed.payload.message,
					timestamp: new Date(parsed.payload.timestamp),
					isUser: false,
					userName: parsed.payload.userName || "Unknown",
				};
			case "create":
				return {
					type: parsed.type,
					text: parsed.payload.message,
					timestamp: new Date(parsed.payload.timestamp),
					isUser: false,
					user: parsed.payload.user
				};
			case "join":
				return {
					type: parsed.type,
					text: parsed.payload.message,
					timestamp: new Date(parsed.payload.timestamp),
					isUser: false,
					user: parsed.payload.user,
					friends: parsed.payload.friends
				}
				break;
			default:
				return null;
		}

		return null;
	} catch (error) {
		console.error("Error parsing socket message:", error);
		return null;
	}
};

export default connectSocket;
