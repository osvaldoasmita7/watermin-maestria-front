import React from "react";
import { DashboardTemplate } from "../components/DashboardTemplate";
import { itemsMenu } from "../data/itemsMenu";
import { Follow } from "../components/Follow";

export const FollowInvoice = () => {
  return (
    <div>
      <DashboardTemplate
        itemsHeader={itemsMenu}
        withRouteHeader={true}
        //   Esto es para saber cual es la ruta actual, el último es el más actual
        routes={["Pedidos", "Cliente", "Nuevo Pedido"]}
      >
        {/* <h1 className="text-center text-disabled">Crear pedido</h1> */}
        <Follow></Follow>
      </DashboardTemplate>
    </div>
  );
};
