import WebSocket from "ws";

export type MessageType =
	| "create"
	| "join"
	| "message"
	| "error"
	| "delete";

export interface IncomingMessage {
	type: MessageType;
	payload: {
		user?: {
			id?: string;
			name?: string;
			roomId?: string;
		};
		roomName?: string;
		message?: string;
	};
}

export interface OutgoingMessage {
	type: MessageType;
	payload: {
		user: {
			id: string;
			name: string;
			roomId: string;
		};
		message: string;
		timestamp: number;
		roomId?: string;
        friends?:Object[];
	};
}

export interface User {
	id: string;
	name: string;
	roomId: string;
	socket: WebSocket;
}

export interface Room {
	id: string;
	name: string;
	users: Set<string>; // Set of user IDs
}

export type PublicUser = Omit<User, "socket">;

export enum ChatErrorCode {
	INVALID_MESSAGE = "INVALID_MESSAGE",
	ROOM_NOT_FOUND = "ROOM_NOT_FOUND",
	USER_NOT_FOUND = "USER_NOT_FOUND",
}
