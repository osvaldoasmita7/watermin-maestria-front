import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { verifyJWT2 } from "../helpers/JWT";

export const useSocket = (serverPath) => {
  // const socket = useMemo(() =>io.connect(serverPath, {transports: ["websocket"],}),[serverPath]);
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(true);

  // Función para conectar al socket
  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("x-token");
    const { negocio_id } = verifyJWT2(token);

    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token-app": token,
        "location-path": window.location.pathname,
        negocio_id: negocio_id,
      },
    });

    setSocket(socketTemp);
    setOnline(true);
  }, [serverPath]);

  // Función para desconectar al socket
  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setOnline(false);
    }
  }, [socket]);

  // Para el socket
  useEffect(() => {
    if (socket) {
      setOnline(socket.connected);
    }
  }, [socket]);
  // Para conectado
  useEffect(() => {
    if (socket)
      socket.on("connect", () => {
        setOnline(true);
      });

    // return socket.disconnect();//Util para cuando se hace un logout para que se cierre la comunicación del socket
  }, [socket]);
  // Para desconectado
  useEffect(() => {
    if (socket)
      socket.on("disconnect", () => {
        setOnline(false);
      });
  }, [socket]);

  return { socket, connectSocket, disconnectSocket, online };
};
