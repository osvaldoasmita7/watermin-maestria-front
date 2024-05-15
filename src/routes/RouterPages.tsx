import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequestService } from "../pages/RequestService";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { CreateInvoicesData } from "../pages/CreateInvoicesData";
import { CreateInvoice } from "../pages/CreateInvoice";
import { FollowInvoice } from "../pages/FollowInvoice";
import { NotFound } from "../pages/NotFound";
import { Invoices } from "../pages/Invoices";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RequestService />,
  },
  {
    path: "/register",
    element: <Register />,
  },
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const RouterPages = () => <RouterProvider router={router} />;
