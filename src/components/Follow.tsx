import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
interface Props {
  status: number;
}
export const Follow = ({ status }: Props) => {
  return (
    <Steps
      items={[
        {
          title: (
            <>
              Pedido creado<br></br>
            </>
          ),
          status: status > 1 ? "finish" : status == 1 ? "process" : "wait",
          icon: <UserOutlined />,
        },
        {
          title: (
            <>
              Recibido por sucursal<br></br>
            </>
          ),
          status: status > 2 ? "finish" : status == 2 ? "process" : "wait",
          icon: <SolutionOutlined />,
        },
        {
          title: (
            <>
              Enviado<br></br>
            </>
          ),
          status: status > 3 ? "finish" : status == 3 ? "process" : "wait",
          icon: <LoadingOutlined />,
        },
        {
          title: (
            <>
              Entregado<br></br>
            </>
          ),
          status: status > 4 ? "finish" : status == 4 ? "process" : "wait",
          icon: <SmileOutlined />,
        },
      ]}
    />
  );
};
