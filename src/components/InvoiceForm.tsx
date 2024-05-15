import type { FormProps } from "antd";
import { Button, Col, Form, Input, List, Row, Select, Typography } from "antd";
import { FieldType } from "../types/FieldInputType";
import { InputCustom } from "./InputCustom";
import { MinusCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { useNotification } from "../hooks/useNotification";
import { items } from "../data/ColumnsFormInvoiceData";
import { Product } from "./Product";
import { IProduct } from "../interfaces";

interface IAddressForm {
  name: string;
  street: string;
  ext: string;
  interior: string;
  postalCode: string;
  colonia: string;
  delegacion: string;
  city: string;
}

export const InvoiceForm = () => {
  const [products, setProducts] = useState<IProduct[]>([
    {
      name: "Bonafont",
      idProduct: 1,
      image:
        "https://www.soriana.com/dw/image/v2/BGBD_PRD/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw85232b75/images/product/0758104000500_A.jpg?sw=445&sh=445&sm=fit",
      size: "20lts",
      price: 28,
    },
    {
      name: "Epura",
      idProduct: 2,
      image:
        "data:image/jpeg;base64,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",
      size: "20lts",
      price: 24,
    },
    {
      name: "Ciel",
      idProduct: 3,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
      size: "20lts",
      price: 21,
    },
  ]);
  interface ICart {
    idProduct: number;
    name: string;
    quantity: number;
    total: number;
    price: number;
  }
  const [cart, setCart] = useState<ICart[]>([]);
  const addCart = (item: IProduct) => {
    let index = cart.findIndex(
      (element: ICart) => element.idProduct == item.idProduct
    );
    let newCart = cart;
    if (index === -1)
      newCart.push({
        idProduct: item.idProduct,
        name: item.name,
        quantity: 1,
        price: item.price,
        total: item.price * 1,
      });
    else {
      newCart[index] = {
        ...newCart[index],
        quantity: newCart[index].quantity + 1,
        total: (newCart[index].quantity + 1) * newCart[index].price,
      };
    }

    setCart([...newCart]);
  };
  const restCart = (index: number) => {
    cart[index].quantity = cart[index].quantity - 1;
    cart[index].total = (cart[index].quantity - 1) * cart[index].price;
    if (cart[index].quantity <= 0) cart.splice(index, 1);

    setCart([...cart]);
  };
  console.log("Cart", cart);
  const sumTotal = () => {
    let total = 0;
    for (const item of cart) {
      total = total + item.quantity * item.price;
    }
    return total;
  };
  return (
    <Row>
      <List
        header={<div>Tu carrito</div>}
        footer={
          <div>
            {cart.length ? (
              <>
                Total: ${sumTotal()} <br></br>
                <Select
                  placeholder="Selecciona la sucursal"
                  onChange={() => {}}
                >
                  <Select.Option value="Iztacalco">Iztacalco</Select.Option>
                </Select>
                <br></br>
                <Button type="primary" className="mt-3">
                  Solicitar pedido
                </Button>
              </>
            ) : (
              "Selecciona algún elemento"
            )}
          </div>
        }
        bordered
        dataSource={cart}
        renderItem={(item: ICart, index: number) => (
          <List.Item>
            {/* restCart */}
            <MinusCircleOutlined onClick={() => restCart(index)} />
            <Typography.Text mark>
              {item.name} - {item.quantity} pz(s) x ${item.total}
            </Typography.Text>
          </List.Item>
        )}
      />

      {/*  */}
      {products.map((product) => (
        <Product addCart={addCart} product={product}></Product>
      ))}
    </Row>
  );
};
