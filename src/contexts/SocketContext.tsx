import { createContext, useContext, useEffect, useState } from "react";

import { useSocket } from "../hooks/useSocket";

import { AuthContext } from "./AuthContext";
import { IOthers } from "../interfaces";

export const SocketContext = createContext<IOthers>({ online: false });

interface Props {
  children: any;
}
export const SocketProvider = ({ children }: Props) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const { socket, online, connectSocket, disconnectSocket } =
    useSocket("localhost:3000");
  const { user } = useContext(AuthContext);
  // Si está conectado
  useEffect(() => {
    if (user?.token) {
      connectSocket();
    }
  }, [user?.token, connectSocket]);

  // Si está desconectado
  useEffect(() => {
    if (!user?.token) {
      disconnectSocket();
    }
  }, [user, disconnectSocket]);

  useEffect(() => {
    for (const room of rooms) {
      socket?.on(room.name, room.callback);
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, online, setRooms, rooms }}>
      {children}
    </SocketContext.Provider>
  );
};
