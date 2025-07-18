import { WebSocket, WebSocketServer } from "ws";
import type { IncomingMessage, OutgoingMessage, Room, User } from "./types";
import { nanoid } from 'nanoid'

const users: Map<string, User> = new Map();
const rooms: Map<string, Room> = new Map();

const PORT = 8080;
const app = new WebSocketServer({ port: PORT });

app.on("connection", (ws) => {
	console.log("User Connected");

	ws.on("message", (data) => {
		try {
			const message = JSON.parse(data.toString()) as IncomingMessage;
			handleMessage(message, ws);
		} catch (err) {
			ws.send(
				JSON.stringify({
					type: "error",
					payload: { message: "Invalid message format", timestamp: Date.now() },
				})
			);
		}
	});

	ws.on("close", () => {
		const user = getUserBySocket(ws);
		if (!user) return;

		users.delete(user.id);
		const room = rooms.get(user.roomId);
		if (room) {
			room.users.delete(user.id);

			const leaveMsg: OutgoingMessage = {
				type: "left",
				payload: {
					user: { id: user.id, name: user.name, roomId: user.roomId },
					message: `${user.name} left the room.`,
					timestamp: Date.now(),
					friends: getFriends(user.roomId),
				},
			};
			broadcastToRoom(leaveMsg, user.roomId, ws);

			// Optional: delete room if empty
			if (room.users.size === 0) {
				rooms.delete(room.id);
			}
		}
	});
});

console.log(`✅ WebSocket server running at ws://localhost:${PORT}`);

const handleMessage = (message: IncomingMessage, ws: WebSocket) => {
	const { type, payload } = message;

	switch (type) {
		case "create": {
			const roomId = nanoid(6);
			const roomName = payload.roomName || "Earth";
			const userId = nanoid(9);
			const userName = payload.user?.name || "Anon";

			const user: User = {
				id: userId,
				name: userName,
				roomId,
				socket: ws,
			};
			console.log(user.id, user.name);
			users.set(userId, user);

			const room: Room = {
				id: roomId,
				name: roomName,
				users: new Set([userId]),
			};
			rooms.set(roomId, room);

			const outgoing: OutgoingMessage = {
				type: "create",
				payload: {
					timestamp: Date.now(),
					message: `${user.name} created ${roomName}`,
					user: {
						id: user.id,
						name: user.name,
						roomId,
					},
				},
			};

			broadcastToRoom(outgoing, roomId);
			break;
		}

		case "join": {
			const roomId = payload.user?.roomId;
			const name = payload.user?.name || "Anon";

			if (!roomId) {
				ws.send(
					JSON.stringify({
						type: "error",
						payload: { message: "No roomId provided.", timestamp: Date.now() },
					})
				);
				return;
			}

			const room = rooms.get(roomId);
			if (!room) {
				ws.send(
					JSON.stringify({
						type: "error",
						payload: { message: "Room does not exist.", timestamp: Date.now() },
					})
				);
				return;
			}

			const userId = nanoid(9);
			const user: User = {
				id: userId,
				name,
				roomId,
				socket: ws,
			};

			users.set(userId, user);
			room.users.add(userId);

			const outgoing: OutgoingMessage = {
				type: "join",
				payload: {
					user: { id: user.id, name: user.name, roomId },
					message: `${user.name} joined the room.`,
					timestamp: Date.now(),
					friends: getFriends(roomId),
				},
			};

			broadcastToRoom(outgoing, roomId);
			break;
		}

		case "message": {
			const user = getUserBySocket(ws);

			if (!user) {
				ws.send(
					JSON.stringify({
						type: "error",
						payload: { message: "User not found.", timestamp: Date.now() },
					})
				);
				return;
			}

			const room = rooms.get(user.roomId);
			if (!room) {
				ws.send(
					JSON.stringify({
						type: "error",
						payload: { message: "Room doesn't exist.", timestamp: Date.now() },
					})
				);
				return;
			}

			const outgoing: OutgoingMessage = {
				type: "message",
				payload: {
					user: {
						id: user.id,
						name: user.name,
						roomId: user.roomId,
					},
					message: payload.message || "",
					timestamp: Date.now(),
				},
			};

			broadcastToRoom(outgoing, user.roomId, ws);
			break;
		}

		case "delete": {
			const roomId = payload.user?.roomId;
			if (!roomId) {
				ws.send(
					JSON.stringify({
						type: "error",
						payload: { message: "Room doesn't exist.", timestamp: Date.now() },
					})
				);
				return;
			}
			if (!rooms.has(roomId)) {
				ws.send(
					JSON.stringify({
						type: "error",
						payload: { message: "Room doesn't exist.", timestamp: Date.now() },
					})
				);
				return;
			}

			const outgoing: OutgoingMessage = {
				type: "message",
				payload: {
					message: `${payload.user?.name} deleted ${payload.roomName}`,
					timestamp: Date.now(),
					user: {
						id: payload.user?.id || nanoid(9),
						name: payload.user?.name || "Anonymous",
						roomId: payload.user?.roomId || "",
					},
				},
			};

			broadcastToRoom(outgoing, roomId, ws);

			rooms.delete(roomId);
			break;
		}

		default:
			ws.send(
				JSON.stringify({
					type: "error",
					payload: { message: "Unknown message type", timestamp: Date.now() },
				})
			);
			break;
	}
};

const broadcastToRoom = (
	msg: OutgoingMessage,
	roomId: string,
	excludeWs?: WebSocket
) => {
	const room = rooms.get(roomId);
	if (!room) return;

	const data = JSON.stringify(msg);

	room.users.forEach((userId) => {
		const user = users.get(userId);
		if (user && user.socket.readyState === WebSocket.OPEN) {
			if (user.socket !== excludeWs) {
				user.socket.send(data);
			}
		}
	});
};

const getUserBySocket = (ws: WebSocket): User | undefined =>
	Array.from(users.values()).find((u) => u.socket === ws);

const getFriends = (roomId: string): Object[] => {
	return Array.from(users.values())
		.filter((user) => user.roomId === roomId)
		.map((user) =>
			({ id: user.id, name: user.name, roomId: user.roomId }));
};