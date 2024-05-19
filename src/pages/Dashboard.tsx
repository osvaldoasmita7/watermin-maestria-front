import { useContext } from "react";
import { DashboardTemplate } from "../components/DashboardTemplate";
import { itemsMenu } from "../data/itemsMenu";
import { SocketContext } from "../contexts/SocketContext";
import { Row } from "antd";
import { AuthContext } from "../contexts/AuthContext";

export const Dashboard = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  console.log("socket", socket);
  return (
    <div>
      <DashboardTemplate
        itemsHeader={itemsMenu}
        withRouteHeader={true}
        //   Esto es para saber cual es la ruta actual, el último es el más actual
        routes={["Inicio"]}
      >
        <h1 className="text-center text-disabled">Bienvenido a watermin</h1>
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
          {/* Estatus del servicio: {socket?.connected ? "Ok" : "Inactivo"} */}
        </Row>
        <code>{JSON.stringify(user)}</code>
        {/* <code>{JSON.stringify(socket)}</code> */}
      </DashboardTemplate>
    </div>
  );
};
