import { Dispatch } from "react";
import { Socket } from "socket.io-client";

export interface ItemsInvoiceForm {
  label: string;
  name:
    | "username"
    | "password"
    | "confirmPassword"
    | "postalCode"
    | "remember"
    | "name"
    | ["name"]
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
  id__company?: number;
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
    username: string;
    id: number;
    token: string;
    active: number;
    type_id: number;
    companies?: companiesAttributes[];
  };
}
export interface companiesAttributes {
  id?: number;
  name?: string;
}

export interface IOthers {
  socket?: Socket;
  online: boolean;
  setRooms?: Dispatch<React.SetStateAction<any[]>>;
  rooms?: any[];
}

export interface IAddressForm {
  name: string;
  street: string;
  ext: string;
  interior: string;
  postalCode: string;
  colonia: string;
  delegacion: string;
  city: string;
}

export interface IPostalCode {
  id_cat: number;
  cp: string;
  colonia: string;
  municipio: string;
  estado: string;
  ciudad: string;
}
export interface invoicesAttributes {
  id?: number;
  date?: string;
  time?: string;
  total?: number;
  createdBy?: number;
  created_by?: number;
  idStatus?: number;
  id_company?: number;

  name?: string;
  postalcode?: string;
  street?: string;
  exterior?: string;
  interior?: string;
  city?: string;
  delegation?: string;
  cologne?: string;
}
export interface ICart {
  idProduct: number;
  name: string;
  quantity: number;
  total: number;
  price: number;
}
export interface productsAttributes {
  idProduct?: number;
  name?: string;
  image?: string;
  size?: string;
  price?: number;
  id__company?: number;
}
export interface IOrders {
  idOrder: number;
  quantity: number;
  idProduct?: number;
  idProduct_product: IProduct;
}
export interface IInvoice {
  id: number;
  date: string;
  time: string;
  total: number;
  created_by?: number;
  id_status?: number;
  name: string;
  postalcode: string;
  street: string;
  exterior: string;
  interior: string;
  city: string;
  delegation: string;
  cologne: string;
  id_company: string;
  orders: IOrders[];
  id_status_status: IStatus;
}
export interface IStatus {
  id?: number;
  name: string;
}
