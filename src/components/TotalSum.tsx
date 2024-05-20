import { Button } from "antd";
interface Props {
  total: number;
  funcion?: (params?: any) => void;
}
export const TotalSum = ({ total, funcion }: Props) => {
  return (
    <>
      Total: ${total} <br></br>
      <Button type="primary" className="mt-3" onClick={funcion}>
        Solicitar pedido
      </Button>
    </>
  );
};
