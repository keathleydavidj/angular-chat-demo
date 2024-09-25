export interface User {
  userID: number;
  name: string;
}

export interface ChatMessage {
  id: number;
  user: User;
  content: string;
  timestamp: Date;
}