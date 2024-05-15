import { useContext } from "react";
import { DataForm } from "../components/DataForm";
import { SocketContext } from "../contexts/SocketContext";
export const RequestService = () => {
  const { socket } = useContext(SocketContext);
  console.log("Activo", socket);
  return (
    <div className="background-root h-100-important">
      <DataForm />
      Estatus:{socket?.connected ? "Activo" : "Offline"}
    </div>
  );
};
