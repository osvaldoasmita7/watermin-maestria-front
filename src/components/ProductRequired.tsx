import { Col } from "antd";
import { IOrders } from "../interfaces";
import { useId } from "react";
interface Props {
  product: IOrders;
}
export const ProductRequired = ({ product }: Props) => {
  const index = useId();
  return (
    <Col xl={8} className=" mx-2" key={index}>
      <div className="container">
        <div className="bg-red1">
          <img
            alt=""
            src={product.idProduct_product.image}
            style={{ width: 120, height: 150 }}
          />

          <p className="centered px-1 py-3">
            <strong>{product.quantity}</strong>
          </p>
        </div>
      </div>
    </Col>
  );
};
