import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useState } from "react";

export const Follow = () => {
  const [invoice, setInvoice] = useState({
    id: 1,
    status: 4,
    updates: [
      {
        status: 1,
        date: "2024/05/01",
        time: "14:26",
      },
      {
        status: 2,
        date: "2024/05/01",
        time: "14:26",
      },
      {
        status: 3,
        date: "2024/05/01",
        time: "14:26",
      },
      {
        status: 4,
        date: "2024/05/01",
        time: "14:26",
      },
    ],
  });
  const getStatus = (statusId: number) => {
    const status = invoice.updates.find(
      (item: any) => item.status === statusId
    );
    console.log("status", status);
    if (status)
      return (
        <>
          {status.date} <br></br> {status.time}
        </>
      );
  };
  return (
    <Steps
      items={[
        {
          title: (
            <>
              Pedido creado<br></br>
              {invoice.status >= 1 ? getStatus(1) : ""}
            </>
          ),
          status:
            invoice.status > 1
              ? "finish"
              : invoice.status == 1
              ? "process"
              : "wait",
          icon: <UserOutlined />,
        },
        {
          title: (
            <>
              Recibido por sucursal<br></br>{" "}
              {invoice.status >= 2 ? getStatus(2) : ""}
            </>
          ),
          status:
            invoice.status > 2
              ? "finish"
              : invoice.status == 2
              ? "process"
              : "wait",
          icon: <SolutionOutlined />,
        },
        {
          title: (
            <>
              Enviado<br></br> {invoice.status >= 3 ? getStatus(3) : ""}
            </>
          ),
          status:
            invoice.status > 3
              ? "finish"
              : invoice.status == 3
              ? "process"
              : "wait",
          icon: <LoadingOutlined />,
        },
        {
          title: (
            <>
              Entregado<br></br> {invoice.status >= 4 ? getStatus(4) : ""}
            </>
          ),
          status:
            invoice.status > 4
              ? "finish"
              : invoice.status == 4
              ? "process"
              : "wait",
          icon: <SmileOutlined />,
        },
      ]}
    />
  );
};
