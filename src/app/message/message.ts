import {User} from "../auth/user";
import {Conversation} from "../conversation/conversation";

export interface Message {
  id: number;
  content: string;
  createdAt: number;
  conversation: Conversation;
  sender: User;
}
