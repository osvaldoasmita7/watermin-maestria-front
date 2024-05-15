import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { SocketIO } from "../interfaces";

export const useSocket = (serverPath: string) => {
  // const socket = useMemo(() =>io.connect(serverPath, {transports: ["websocket"],}),[serverPath]);
  const [socket, setSocket] = useState<SocketIO>();
  //   Para el status online
  const [online, setOnline] = useState(false);

  // Función para conectar al socket
  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketTemp: SocketIO = io(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token-app": token,
      },
    });
    setSocket(socketTemp);
  }, [serverPath]);

  // Función para desconectar al socket
  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  // Para el socket
  useEffect(() => {
    setOnline(socket?.connected || false);
  }, [socket]);
  // Para conectado
  useEffect(() => {
    socket?.on("connect", () => {
      setOnline(true);
    });
    // return socket.disconnect();//Util para cuando se hace un logout para que se cierre la comunicación del socket
  }, [socket]);
  // Para desconectado
  useEffect(() => {
    socket?.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online, connectSocket, disconnectSocket };
};
