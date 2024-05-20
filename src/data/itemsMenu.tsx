export type MenuItem = Required<MenuProps>["items"][number];
import {
  BookOutlined,
  EyeOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  path?: any
): MenuItem {
  if (!children)
    return {
      key,
      icon,
      path,
      label,
    } as MenuItem;
  return {
    key,
    icon,
    children,
    label,
    path,
  } as MenuItem;
}
export const itemsMenu: MenuItem[] = [
  getItem("Pedidos", "pedidos", <BookOutlined />, [
    getItem("Crear pedido", "pedidos/cliente", <FileAddOutlined />),
    getItem("Ver pedidos", "pedidos", <EyeOutlined />),
  ]),
  getItem("Cerrar sesión", "logout", <LogoutOutlined />),
];
