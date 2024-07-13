import { Card, } from "antd";
import { productsAttributes } from "../interfaces";
import Meta from "antd/es/card/Meta";
interface Props {
  onClick: (item: productsAttributes) => void;
  product: productsAttributes;
}
export const Product = ({ onClick, product }: Props) => {
  const onClickCard = () => onClick(product);
  return (

    <Card
      hoverable
      onClick={onClickCard}
      className="mx-2 my-3"
      style={{ width: 240 }}

      cover={<img alt="example" style={{ maxHeight: 240, maxWidth: "100%" }} src={product.image} />}
    >
      <Meta title={product.name} description={`$${product.price}`} />
    </Card>

  );
};
{/* <Col sm={24} lg={12} xl={6} xs={24} className="mx-auto my-5">
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
      
      
      //   </Button>
    // </Col>*/}