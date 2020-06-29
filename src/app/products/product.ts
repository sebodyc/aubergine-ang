import {User} from "../auth/user";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  User: User;
  type: string;
  ZipCode: number;
}

