import firebase from "firebase/compat/app";

export type Order = {
  customer: string;
  date: string;
  id: string;
  op1: string;
  op2: string;
  orderNum: string;
  partCount: string;
  partName: string;
  price: string;
  time: string;
};

export type Customer = {
  name: string;
  hourRate: string;
};

export type Data = {
  user: firebase.User | null;
  customers: Customer[];
  orders: Order[];
  todos: Todo[];
};

export type OrderNoId = {
  customer: string;
  date: string;
  op1: string;
  op2: string;
  orderNum: string;
  partCount: string;
  partName: string;
  price: string;
  time: string;
};

export type Todo = {
  subject: string;
  description: string;
  state: "CREATED" | "ACTIVE" | "DONE";
  date: string;
  id: string;
}

export type TodoNoID = {
  subject: string;
  description: string;
  state: "CREATED" | "ACTIVE" | "DONE";
  date: string;
}

export type Content = {
  content: string;
  date: string;
};

export type Filter = {
  partName: string;
  orderNum: string;
  customer: string;
  date: string;
}
