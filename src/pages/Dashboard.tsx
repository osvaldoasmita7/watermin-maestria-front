import { useContext } from "react";
import { DashboardTemplate } from "../components/DashboardTemplate";
import { itemsMenu } from "../data/itemsMenu";
import { SocketContext } from "../contexts/SocketContext";
import { AuthContext } from "../contexts/AuthContext";

export const Dashboard = () => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  console.log("user", user);
  return (
    <div>
      <DashboardTemplate
        itemsHeader={itemsMenu}
        withRouteHeader={true}
        //   Esto es para saber cual es la ruta actual, el último es el más actual
        routes={["Inicio"]}
      >
        <h1 className="text-center text-disabled">Bienvenido a watermin</h1>
        Estatus:{socket?.connected ? "Activo" : "Offline"}
        <code>{JSON.stringify(user)}</code>
      </DashboardTemplate>
    </div>
  );
};
