export interface Message {
  text: string;
  timestamp: string | Date;
  isUser?: boolean;
  userName?: string;
  id?: string;
  avatar?: string;
  type?: string;
  user?: any;
  friends?: Object[]
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}

export interface Room {
  id: string;
  name: string;
  users: User[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
