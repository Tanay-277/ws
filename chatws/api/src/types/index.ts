import WebSocket from "ws";
/**
 * User type representing a connected client
 */
export type MessageType = "create" | "join" | "message" | "error";

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
            roomId:string;
		};
		message: string;
		timestamp: number;
        roomId?:string;
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

// Extra utility types for better type safety

/**
 * Type for user data safe to send to clients (without socket)
 */
export type PublicUser = Omit<User, "socket">;

/**
 * Error codes for the chat system
 */
export enum ChatErrorCode {
	INVALID_MESSAGE = "INVALID_MESSAGE",
	ROOM_NOT_FOUND = "ROOM_NOT_FOUND",
	USER_NOT_FOUND = "USER_NOT_FOUND",
}
