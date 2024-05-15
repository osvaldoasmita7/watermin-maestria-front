import { Button, Card, Col, List, Row } from "antd";
import { useState } from "react";
import { IProduct } from "../interfaces";
import {
  CheckCircleOutlined,
  DeleteRowOutlined,
  EyeOutlined,
  SendOutlined,
} from "@ant-design/icons";
interface IInvoice {
  id: number;
  date: string;
  time: string;
  total: number;
  products: IOrders[];
}
interface IOrders {
  idOrder: number;
  quantity: number;
  product: IProduct;
}
export const InvoicesList = () => {
  const [invoices, setInvoices] = useState<IInvoice[]>([
    {
      id: 1,
      date: "2024/04/01",
      time: "15:20:23",
      total: 300,
      products: [
        {
          idOrder: 1,
          quantity: 100,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
        {
          idOrder: 1,
          quantity: 1,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
      ],
    },
    {
      id: 1,
      date: "2024/04/01",
      time: "15:20:23",
      total: 300,
      products: [],
    },
    {
      id: 1,
      date: "2024/04/01",
      time: "15:20:23",
      total: 300,
      products: [
        {
          idOrder: 1,
          quantity: 100,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
        {
          idOrder: 1,
          quantity: 1,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
      ],
    },
    {
      id: 1,
      date: "2024/04/01",
      time: "15:20:23",
      total: 300,
      products: [
        {
          idOrder: 1,
          quantity: 100,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
        {
          idOrder: 1,
          quantity: 1,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
      ],
    },
    {
      id: 1,
      date: "2024/04/01",
      time: "15:20:23",
      total: 300,
      products: [
        {
          idOrder: 1,
          quantity: 100,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
        {
          idOrder: 1,
          quantity: 1,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
      ],
    },
    {
      id: 1,
      date: "2024/04/01",
      time: "15:20:23",
      total: 300,
      products: [
        {
          idOrder: 1,
          quantity: 100,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
        {
          idOrder: 1,
          quantity: 1,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
      ],
    },
    {
      id: 1,
      date: "2024/04/01",
      time: "15:20:23",
      total: 300,
      products: [
        {
          idOrder: 1,
          quantity: 100,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
        {
          idOrder: 1,
          quantity: 1,
          product: {
            name: "Ciel",
            idProduct: 3,
            image:
              "https://http2.mlstatic.com/D_NQ_NP_782867-MLM71072516866_082023-O.webp",
            size: "20lts",
            price: 21,
          },
        },
      ],
    },
  ]);
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 5,
      }}
      dataSource={invoices}
      renderItem={(item) => (
        <List.Item>
          <Card
            extra={
              <Button>
                <EyeOutlined />
                Ver más
              </Button>
            }
            title={
              <>
                No. {item.id} <br />
                Fecha: {item.date} <br />
                Hora: {item.time}
                <h5 className="text-success">${item.total}</h5>
              </>
            }
          >
            <Row>
              {!item.products.length && (
                <h5>No hay productos asignados a este pedido</h5>
              )}
              {item.products.map((order: IOrders) => {
                return (
                  <Col xl={8} className=" mx-2">
                    <div className="container">
                      <div className="bg-red1">
                        <img
                          src={order.product.image}
                          style={{ width: "100%" }}
                        />

                        <p className="centered px-1 py-3">
                          <strong>{order.quantity}</strong>
                        </p>
                      </div>
                    </div>
                  </Col>
                );
              })}
              <Col className="mt-3">
                <Button className="me-2" type="primary">
                  <SendOutlined />
                  Enviar
                </Button>
                <Button
                  className="me-2"
                  type="primary"
                  style={{ backgroundColor: "green" }}
                >
                  <CheckCircleOutlined />
                  Completar
                </Button>
                <Button
                  className="me-2"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  <DeleteRowOutlined />
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
};
