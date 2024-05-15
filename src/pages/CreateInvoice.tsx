import { DashboardTemplate } from "../components/DashboardTemplate";
import { InvoiceForm } from "../components/InvoiceForm";
import { itemsMenu } from "../data/itemsMenu";

export const CreateInvoice = () => {
  return (
    <div>
      <DashboardTemplate
        itemsHeader={itemsMenu}
        withRouteHeader={true}
        //   Esto es para saber cual es la ruta actual, el último es el más actual
        routes={["Pedidos", "Cliente", "Nuevo Pedido"]}
      >
        {/* <h1 className="text-center text-disabled">Crear pedido</h1> */}
        <InvoiceForm></InvoiceForm>
      </DashboardTemplate>
    </div>
  );
};
