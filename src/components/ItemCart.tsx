import { MinusCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";

interface Props {
  name: string;
  quantity: number;
  total: number;
  onRest?: (params?: any) => void;
}
export const ItemCart = ({ name, quantity, total, onRest }: Props) => {
  return (
    <>
      {/* restCart */}
      <MinusCircleOutlined onClick={onRest} />
      <Typography.Text mark>
        {name} - {quantity} pz(s) x ${total}
      </Typography.Text>
    </>
  );
};
