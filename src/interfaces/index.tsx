import { Socket } from "socket.io-client";

export interface ItemsInvoiceForm {
  label: string;
  name:
    | "username"
    | "password"
    | "confirmPassword"
    | "postalCode"
    | "remember"
    | ["username"]
    | ["password"]
    | ["remember"]
    | ["confirmPassword"]
    | ["postalCode"]
    | ["city"]
    | ["colonia"]
    | ["delegacion"]
    | ["ext"]
    | ["interior"]
    | ["street"]
    | "city"
    | "colonia"
    | "delegacion"
    | "ext"
    | "interior"
    | "street";
  rules?: any[];
  type: "input" | "select";
  disabled?: boolean;
  valueType?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}
export interface IProduct {
  name: string;
  idProduct: number;
  image: string;
  size: string;
  price: number;
}
export interface IFormLogin {
  username: string;
  password: string;
  rememberme: boolean;
  confirmPassword?: string;
}
export interface ILogin {
  ok: boolean;
  user: {
    name: string;
    id: number;
    token: string;
    active: number;
    type_id: number;
  };
}
export interface SocketIO extends Socket {
  userId?: number;
}
export interface IOthers {
  socket?: SocketIO;
  online: boolean;
}
