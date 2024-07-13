import { Button, Card, Col, List, Row, Select, Space, Statistic } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { companiesAttributes, IInvoice, IOrders } from "../interfaces";
import {
  CheckCircleOutlined,
  DeleteRowOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";
import { SocketContext } from "../contexts/SocketContext";
import { ProductRequired } from "./ProductRequired";
import { LinkToMaps } from "./LinkToMaps";
import { useDatabase } from "../hooks/useDatabase";
import { Link } from "react-router-dom";

export const InvoicesList = () => {
  const { socket, setRooms, rooms } = useContext(SocketContext);
  const { getInvoices, updateInvoice, getcompaniesByUserId } = useDatabase();
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState("");
  const [companies, setCompanies] = useState<companiesAttributes[]>([]);
  const [companySelected, setCompanySelected] = useState(null);

  const { user } = useContext(AuthContext);
  const getListInvoices = useCallback(async (params?: string) => {
    setLoading(true);
    const invoices_response = await getInvoices(params);
    setLoading(false);
    setInvoices([...invoices_response]);
  }, []);
  const getCompanies = useCallback(async () => {
    setLoading(true);
    const resp = await getcompaniesByUserId(user?.id || 0);
    setLoading(false);
    setCompanies([...resp]);
  }, []);

  useEffect(() => {
    console.log("entró");
    switch (user?.type_id) {
      case 1:
        setRoom("my_invoices_" + user.id);
        socketEmit("my_invoices_" + user.id);
        getCompanies();
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
          await getListInvoices(`created_by=${user?.id}`);
          break;
        case 2:
          await getListInvoices(
            `id_company=${user?.companies?.length && user?.companies[0]?.id}`
          );
          break;
        default:
          break;
      }
    }
  }, [user]);
  const updateStatus = async (item: IInvoice, status: number) => {
    await updateInvoice({ ...item, id_status: status });
    getData();
  };
  const drawCompanies = () => {
    if (user?.type_id === 2)
      return user?.companies?.map((company) => {
        return {
          value: company.id,
          label: company.name,
        };
      });
    return companies.map((x) => ({ value: x.id, label: x.name }));
  };
  useEffect(() => {
    getData();
  }, []);
  const timeoutID = setTimeout(() => {
    getInvoicesFiltered(companySelected || "");
  }, 20000);
  useEffect(() => {
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
  const getInvoicesFiltered = async (value?: string) => {
    if (value) {
      switch (user?.type_id) {
        case 1:
          await getListInvoices(`created_by=${user?.id}&&id_company=${value}`);
          break;
        case 2:
          await getListInvoices(`id_company=${value}`);
          break;
        default:
          break;
      }
    } else {
      getData();
    }
  };

  return (
    <>
      <>
        <Space wrap>
          <Select
            defaultValue={user?.companies?.length ? user?.companies[0].id : ""}
            style={{ width: 120, marginBottom: 30 }}
            onChange={async (value: any) => {
              setCompanySelected(value);
              getInvoicesFiltered(value);
            }}
            loading={loading}
            allowClear
            placeholder="Seleccionar"
            options={drawCompanies()}
          />
        </Space>
      </>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 3,
          xxl: 5,
        }}
        dataSource={invoices}
        renderItem={(item, index) => (
          <List.Item>
            <Card
              style={{ padding: 10 }}
              title={
                <Row key={item.id}>
                  <Statistic title="No. " value={item.id} className="me-4" />
                  <Statistic
                    title="Fecha "
                    value={item.date}
                    className="me-4"
                  />
                  <Statistic title="Hora " value={item.time} className="me-4" />
                  <Statistic
                    title="Estatus "
                    valueStyle={{ color: "#3f8600" }}
                    value={item.id_status_status.name}
                    className="me-4"
                  />

                  <Statistic
                    title="Total "
                    valueStyle={{ color: "#3f8600" }}
                    value={`$${item.total}`}
                    className="me-4"
                  />
                  <Link to={`/pedidos/seguimiento?id=${item.id}`}>
                    <Statistic
                      title="Ver más "
                      valueStyle={{ color: "black" }}
                      value={` `}
                      className="me-4"
                    />
                  </Link>
                </Row>
              }
            >
              <Row key={index}>
                <Col>
                  <p>
                    <UserOutlined style={{ marginRight: 10 }} />
                    {item.name}
                  </p>
                  <p>
                    <LinkToMaps
                      cologne={item.cologne}
                      delegation={item.delegation}
                      exterior={item.exterior}
                      postalcode={item.postalcode}
                      street={item.street}
                    />
                  </p>
                </Col>
                <p>
                  {`${item.street} ext: ${item.exterior} int: ${item.interior}. Colonia:${item.cologne}. Delegación: ${item.delegation}. C.P: ${item.postalcode}`}
                </p>

                {!item.orders.length && (
                  <h5>No hay productos asignados a este pedido</h5>
                )}
                {item.orders.map((order: IOrders) => {
                  return <ProductRequired product={order} />;
                })}
              </Row>
              <Row>
                <Col className="mt-3">
                  {user?.type_id === 2 ? (
                    <>
                      {item.id_status === 1 && (
                        <>
                          <Button
                            className="me-2"
                            type="primary"
                            onClick={async () => {
                              await updateStatus(item, 2);
                            }}
                          >
                            <SendOutlined />
                            Recibido
                          </Button>
                        </>
                      )}
                      {item.id_status === 2 && (
                        <>
                          <Button
                            className="me-2"
                            type="primary"
                            onClick={async () => {
                              await updateStatus(item, 3);
                            }}
                          >
                            <SendOutlined />
                            Enviar
                          </Button>
                        </>
                      )}
                      {item.id_status === 3 && (
                        <>
                          <Button
                            className="me-2"
                            type="primary"
                            style={{ backgroundColor: "green" }}
                            onClick={async () => {
                              await updateStatus(item, 4);
                            }}
                          >
                            <CheckCircleOutlined />
                            Completar
                          </Button>
                        </>
                      )}
                      <Button
                        className="me-2"
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={async () => {
                          await updateStatus(item, 5);
                        }}
                      >
                        <DeleteRowOutlined />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    (item.id_status === 1 || item.id_status === 2) ?? (
                      <Button
                        className="me-2"
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={async () => {
                          await updateStatus(item, 5);
                        }}
                      >
                        <DeleteRowOutlined />
                        Cancelar
                      </Button>
                    )
                  )}
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
