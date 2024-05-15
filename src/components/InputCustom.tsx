import { Form, Input } from "antd";
import { FieldType } from "../types/FieldInputType";

interface Props {
  label?: string;
  name?:
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
    | "street"
    | undefined;
  rules?: Rules[];
  valuePropName?: string;
  wrapperCol?: any;
  children: any;
}
interface Rules {
  required: boolean;
  message: string;
}

export const InputCustom = ({
  label,
  name,
  rules,
  valuePropName,
  children,
  wrapperCol,
}: Props) => {
  return (
    <Form.Item<FieldType>
      label={label}
      name={name}
      rules={rules}
      valuePropName={valuePropName}
      wrapperCol={wrapperCol}
    >
      {children}
    </Form.Item>
  );
};
