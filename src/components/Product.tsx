import { Button, Col, Statistic } from "antd";
import { CardComponent } from "./CardComponent";
import { productsAttributes } from "../interfaces";
import { ArrowUpOutlined } from "@ant-design/icons";
interface Props {
  addCart: (item: productsAttributes) => void;
  product: productsAttributes;
}
export const Product = ({ addCart, product }: Props) => {
  return (
    <Col sm={24} lg={12} xl={6} xs={24} className="mx-auto my-5">
      <Button
        type="text"
        className="p-0 h-100"
        block
        style={{ width: "100%", height: "100%" }}
        onClick={() => {
          addCart(product);
        }}
      >
        <CardComponent bordered={false}>
          <Statistic
            title={product.name}
            value={`$${product.price}`}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
          />
          <img
            src={product.image}
            style={{ width: 100, height: 150, resize: "unset" }}
          ></img>
        </CardComponent>
      </Button>
    </Col>
  );
};
