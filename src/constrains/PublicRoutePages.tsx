import { CreateInvoice } from "../pages/CreateInvoice";
import { CreateInvoicesData } from "../pages/CreateInvoicesData";
import { Dashboard } from "../pages/Dashboard";
import { FollowInvoice } from "../pages/FollowInvoice";
import { Invoices } from "../pages/Invoices";
import { Register } from "../pages/Register";
import { RequestService } from "../pages/RequestService";

export const routesPagesNoAuth = [
  {
    path: "/",
    element: <RequestService />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
export const routesPages = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/pedidos/cliente/nuevo-pedido",
    element: <CreateInvoice />,
  },
  {
    path: "/pedidos/cliente",
    element: <CreateInvoicesData />,
  },
  {
    path: "/pedidos/seguimiento",
    element: <FollowInvoice />,
  },
  {
    path: "/pedidos",
    element: <Invoices />,
  },
];
