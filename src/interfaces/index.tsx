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
