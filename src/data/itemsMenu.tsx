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
  getItem("Pedidos", "1", <BookOutlined />, [
    getItem("Crear pedido", "2", <FileAddOutlined />),
    getItem("Ver pedidos", "3", <EyeOutlined />),
  ]),
  getItem("Cerrar sesión", "4", <LogoutOutlined />),
];
