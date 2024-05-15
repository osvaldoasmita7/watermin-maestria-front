import { Button, Col } from "antd";
import { CardComponent } from "./CardComponent";
import { IProduct } from "../interfaces";
interface Props {
  addCart: (item: IProduct) => void;
  product: IProduct;
}
export const Product = ({ addCart, product }: Props) => {
  return (
    <Col sm={24} lg={12} xl={6} xs={24} className="mx-auto my-5">
      <Button
        type="text"
        block
        style={{ width: "100%", height: "100%" }}
        onClick={() => {
          addCart(product);
        }}
      >
        <CardComponent bordered={false}>
          <img
            src={product.image}
            style={{ width: 100, height: 150, resize: "unset" }}
          ></img>
          <h5 className="text-center">{product.name}</h5>
          <h5 className="text-center">${product.price}</h5>
        </CardComponent>
      </Button>
    </Col>
  );
};
