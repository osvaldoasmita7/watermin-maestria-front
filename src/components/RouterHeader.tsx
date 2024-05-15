import { Breadcrumb } from "antd";
interface Props {
  routes: string[];
}
export const RouterHeader = ({ routes }: Props) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {routes.map((route) => (
        <Breadcrumb.Item>{route}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
