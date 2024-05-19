import { Breadcrumb } from "antd";
interface Props {
  routes: string[];
}
export const RouterHeader = ({ routes }: Props) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {routes.map((route, index) => (
        <Breadcrumb.Item key={index}>{route}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
