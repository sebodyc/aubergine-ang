import {User} from "../auth/user";

export interface Message {
  id: number;
  content: string;
  createdAt: number;
  conversation: string;
  sender: User;
}
