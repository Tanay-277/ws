import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react";
import connectSocket, {
	sendMessage as sendSocketMessage,
	parseMessage,
} from "../actions/socket";
import type { Message } from "../types";

interface SocketContextType {
	socket: WebSocket | null;
	isConnected: boolean;
	messages: Message[];
	sendMessage: (message: string) => void;
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
	messages: [],
	sendMessage: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const ws = connectSocket();

		ws.onopen = () => {
			console.log("WebSocket connected");
			setIsConnected(true);
		};

		ws.onclose = () => {
			console.log("WebSocket disconnected");
			setIsConnected(false);
		};

		ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		ws.onmessage = (event) => {
			console.log(event);
			console.log(event.data);

			const message = parseMessage(event.data);
			if (message) {
				setMessages((prev) => [...prev, message]);
			}
			console.log(message);
		};

		setSocket(ws);

		return () => {
			ws.close();
		};
	}, []);

	const sendMessage = useCallback(
		(message: string) => {
			if (socket && isConnected) {
				const success = sendSocketMessage(socket, message);
				if (success) {
					// Add the message to our local state immediately
					const newMessage: Message = {
						text: message,
						timestamp: new Date(),
						isUser: true,
						userName: "You",
					};
					setMessages((prev) => [...prev, newMessage]);
				}
			}
		},
		[socket, isConnected]
	);

	return (
		<SocketContext.Provider
			value={{ socket, isConnected, messages, sendMessage }}
		>
			{children}
		</SocketContext.Provider>
	);
};
