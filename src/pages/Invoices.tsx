import React from "react";
import { DashboardTemplate } from "../components/DashboardTemplate";
import { itemsMenu } from "../data/itemsMenu";
import { InvoicesList } from "../components/InvoicesList";

export const Invoices = () => {
  return (
    <DashboardTemplate
      itemsHeader={itemsMenu}
      routes={["Pedidos"]}
      withRouteHeader={true}
    >
      <InvoicesList></InvoicesList>
    </DashboardTemplate>
  );
};
