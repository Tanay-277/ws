import WebSocket from "ws";
/**
 * User type representing a connected client
 */
export type User = {
	id: string;
	name: string;
	socket: WebSocket;
	roomId: string;
};

/**
 * Room type representing a chat room
 */
export type Room = {
	id: string;
	name: string;
	users: Set<string>;
};

/**
 * Valid message types for the chat system
 */
export type MessageType = "join" | "left" | "disconnect" | "message";

/**
 * Interface for messages received from clients
 */
export interface IncomingMessage {
	type: MessageType;
	payload: {
		message?: string;
		user?: User;
	};
}

/**
 * Interface for messages sent to clients
 */
export interface OutgoingMessage {
	type: MessageType;
	payload: {
		user: Omit<User, "socket">; // Don't include socket in outgoing messages
		message?: string;
		timestamp: number;
	};
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
