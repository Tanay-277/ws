import WebSocket from "ws";

export type MessageType =
	| "create"
	| "join"
	| "message"
	| "error"
	| "delete";


export interface Room {
	id: string;
	name: string;
	users: Set<string>; // Set of user IDs
}
export interface User {
	id: string;
	name: string;
	roomId: string;
	socket: WebSocket;
}

export type PublicUser = Omit<User, "socket">;

export interface IncomingMessage {
	type: MessageType;
	payload: {
		user?: Partial<PublicUser>
		roomName?: string;
		message?: string;
	};
}

export interface OutgoingMessage {
	type: MessageType;
	payload: {
		user: PublicUser
		message: string;
		timestamp: number;
		roomId?: string;
		friends?: Object[];
	};
}



export enum ChatErrorCode {
	INVALID_MESSAGE = "INVALID_MESSAGE",
	ROOM_NOT_FOUND = "ROOM_NOT_FOUND",
	USER_NOT_FOUND = "USER_NOT_FOUND",
}
