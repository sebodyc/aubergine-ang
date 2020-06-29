import {Product} from "../products/product";

export  interface User {
  id: number;
  email : string;
  password: string;
  name : string;
  firtsName : string;
  adress : string;
  zipCode : number;
  inBoxes : any [];
  products : Product[];
}
