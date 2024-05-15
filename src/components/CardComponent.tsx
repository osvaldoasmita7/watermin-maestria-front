import { Card } from "antd";
interface Props {
  children?: any;
  title?: string;
  bordered?: boolean;
  style?: any;
}
export const CardComponent = ({ bordered, children, style, title }: Props) => {
  return (
    <Card
      title={title}
      bordered={bordered}
      style={style}
      className="shadow-card"
    >
      {children}
    </Card>
  );
};
