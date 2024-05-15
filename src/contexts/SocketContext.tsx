import { createContext, useContext, useEffect } from "react";

import { useSocket } from "../hooks/useSocket";

import { AuthContext } from "./AuthContext";
import { IOthers } from "../interfaces";

export const SocketContext = createContext<IOthers>({ online: false });

interface Props {
  children: any;
}
export const SocketProvider = ({ children }: Props) => {
  const { socket, online, connectSocket, disconnectSocket } =
    useSocket("localhost:3000");
  const { user } = useContext(AuthContext);
  // Si está conectado
  useEffect(() => {
    if (user?.token) {
      connectSocket();
    }
  }, [user, connectSocket]);

  // Si está desconectado
  useEffect(() => {
    if (!user?.token) {
      disconnectSocket();
    }
  }, [user, disconnectSocket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
