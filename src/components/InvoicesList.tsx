import { Button, Card, Col, List, Row, Select, Space } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { IProduct } from "../interfaces";
import {
  CheckCircleOutlined,
  DeleteRowOutlined,
  EyeOutlined,
  PushpinOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { SocketContext } from "../contexts/SocketContext";
interface IInvoice {
  id: number;
  date: string;
  time: string;
  total: number;
  created_by?: number;
  id_status?: number;
  name: string;
  postalcode: string;
  street: string;
  exterior: string;
  interior: string;
  city: string;
  delegation: string;
  cologne: string;
  id_company: string;
  orders: IOrders[];
  id_status_status: IStatus;
}
export interface IStatus {
  id?: number;
  name: string;
}
interface IOrders {
  idOrder: number;
  quantity: number;
  idProduct?: number;
  idProduct_product: IProduct;
}
export const InvoicesList = () => {
  const { socket, setRooms, rooms } = useContext(SocketContext);
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState("");

  const { user } = useContext(AuthContext);
  const getInvoices = useCallback(async (params: string = "") => {
    setLoading(true);
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/invoices?" + params,
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const resp = await axios.request(config);
    setLoading(false);
    if (!resp.data?.ok) throw "Error en la petición";
    const response = resp.data;
    const invoices_response = response.invoices as IInvoice[];
    console.log(invoices_response);
    setInvoices([...invoices_response]);
  }, []);
  useEffect(() => {
    console.log("CAmbió room", room);
  }, [room]);
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    console.log("entró");
    switch (user?.type_id) {
      case 1:
        setRoom("my_invoices_" + user.id);
        socketEmit("my_invoices_" + user.id);
        break;
      case 2:
        if (user?.companies?.length) {
          setRoom(`my_company_${user?.companies[0]?.id}`);
          socketEmit(`my_company_${user?.companies[0]?.id}`);
        }
        break;
      default:
        break;
    }
  }, [user?.companies, user?.id]);

  const socketEmit = (event: string) => {
    socket?.emit(event, "Hola desde el front" + event);
  };
  useEffect(() => {
    if (setRooms && rooms) {
      if (!rooms.find((x: any) => x.name === "conected_to_room"))
        setRooms([
          ...rooms,
          {
            name: "conected_to_room",
            callback: (value: any) => {
              console.log("Aquí", value);
            },
          },
        ]);
    }
  }, [socket, rooms, setRooms]);

  const getData = useCallback(async () => {
    if (user?.id) {
      switch (user.type_id) {
        case 1:
          await getInvoices(`created_by=${user?.id}`);
          break;
        case 2:
          await getInvoices(
            `id_company=${user?.companies?.length && user?.companies[0]?.id}`
          );
          break;
        default:
          break;
      }
    }
  }, [user]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {room}
      <Row>
        <div
          style={{
            backgroundColor: socket?.connected ? "green" : "red",
            height: 20,
            width: 20,
            borderRadius: "100%",
            marginRight: 10,
          }}
        ></div>
      </Row>
      {user?.type_id === 2 && (
        <>
          <Space wrap>
            <Select
              defaultValue={user.companies?.length ? user.companies[0].id : ""}
              style={{ width: 120, marginBottom: 30 }}
              onChange={(value: any) => {
                if (value) {
                  getInvoices(`id_company=${value}`);
                }
              }}
              loading={loading}
              allowClear
              options={user.companies?.map((company) => {
                return {
                  value: company.id,
                  label: company.name,
                };
              })}
            />
          </Space>
        </>
      )}
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
        renderItem={(item, index) => (
          <List.Item>
            <Card
              style={{ padding: 10 }}
              // extra={
              //   <Button>
              //     <EyeOutlined />
              //     Ver más
              //   </Button>
              // }
              title={
                <div key={item.id}>
                  No. {item.id} <br />
                  Fecha: {item.date} <br />
                  Hora: {item.time}
                  <h5 className="text-success">${item.total}</h5>
                  <h5 className="text-info">{item.id_status_status.name}</h5>
                </div>
              }
            >
              <Row key={index}>
                <Col>
                  <p>
                    <UserOutlined style={{ marginRight: 10 }} />
                    {item.name}
                  </p>
                  <p>
                    <Link
                      to={`https://www.google.com.mx/maps/search/${item.street} ${item.exterior}. ${item.cologne}. ${item.delegation}. ${item.postalcode}. México`}
                    >
                      <PushpinOutlined style={{ marginRight: 10 }} />
                      Ubicación aproximada
                    </Link>
                  </p>
                </Col>
                <p>
                  {`${item.street} ext: ${item.exterior} int: ${item.interior}. Colonia:${item.cologne}. Delegación: ${item.delegation}. C.P: ${item.postalcode}`}
                </p>

                {!item.orders.length && (
                  <h5>No hay productos asignados a este pedido</h5>
                )}
                {item.orders.map((order: IOrders, index: number) => {
                  return (
                    <Col xl={8} className=" mx-2" key={index}>
                      <div className="container">
                        <div className="bg-red1">
                          <img
                            src={order.idProduct_product.image}
                            style={{ width: 120, height: 150 }}
                          />

                          <p className="centered px-1 py-3">
                            <strong>{order.quantity}</strong>
                          </p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Col className="mt-3">
                  {item.id_status === 1 && (
                    <>
                      <Button className="me-2" type="primary">
                        <SendOutlined />
                        Recibido
                      </Button>

                      <Button
                        className="me-2"
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        <DeleteRowOutlined />
                        Cancelar
                      </Button>
                    </>
                  )}
                  {item.id_status === 2 && (
                    <>
                      <Button className="me-2" type="primary">
                        <SendOutlined />
                        Enviar
                      </Button>

                      <Button
                        className="me-2"
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        <DeleteRowOutlined />
                        Cancelar
                      </Button>
                    </>
                  )}
                  {item.id_status === 3 && (
                    <>
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
                    </>
                  )}
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <code>{JSON.stringify(user)}</code>
    </>
  );
};
