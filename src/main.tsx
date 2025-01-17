import React from "react";
import ReactDOM from "react-dom/client";
// import { RouterPages } from "./routes/RouterPages.tsx";
import "./assets/css/index.css";
import { SocketProvider } from "./contexts/SocketContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { AppRouter } from "./routes/AppRouter.tsx";
import { InvoiceProvider } from "./contexts/InvoiceContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <InvoiceProvider>
          {/* <RouterPages /> */}
          <AppRouter></AppRouter>
        </InvoiceProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
