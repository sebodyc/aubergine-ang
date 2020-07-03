import {User} from "../auth/user";
import {Product} from "../products/product";
import {Message} from "../message/message";

export interface Conversation {

  id: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
  buyer: User;
  messages: Message[];
}
