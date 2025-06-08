import { WebSocket, WebSocketServer } from "ws";
import type { IncomingMessage, Room, User } from "./types";
import { randomUUID } from "node:crypto";

const users: Map<string, User> = new Map();
const rooms: Map<string, Room> = new Map();

const PORT = 8000;
const app = new WebSocketServer({ port: PORT });

app.on("connection", (ws) => {
	console.log("User Connected");

	ws.on("message", (data: IncomingMessage, isBinary) => {
		console.log("Received : %s", data);
		app.clients.forEach((client) => {
			if (ws != client && client.readyState == WebSocket.OPEN) {
				client.send(data.type, { binary: isBinary });
			}
		});
	});
});

// console.log(`Websocket Server running at ${PORT}`);

const handleMessage = (message: IncomingMessage, ws: WebSocket) => {
	const { type } = message;
	switch (type) {
		case "join":
			const userId = randomUUID();

			const roomId = message.payload.user?.roomId;
			if (!roomId) return;
			if (!rooms.get(roomId)) {
				ws.send(JSON.stringify({ error: "No roomId provided." }));
			}

			users.set(userId, {
				id: userId,
				name: message.payload.user?.name || "Anon",
				roomId,
				socket: ws,
			});
			break;
		case "left":
		case "disconnect":
		case "message":
	}
};
