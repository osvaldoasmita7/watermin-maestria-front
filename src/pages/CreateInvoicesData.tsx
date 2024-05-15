import { DashboardTemplate } from "../components/DashboardTemplate";
import { InvoiceDataForm } from "../components/InvoiceDataForm";
import { itemsMenu } from "../data/itemsMenu";

export const CreateInvoicesData = () => {
  return (
    <div>
      <DashboardTemplate
        itemsHeader={itemsMenu}
        withRouteHeader={true}
        //   Esto es para saber cual es la ruta actual, el último es el más actual
        routes={["Pedidos", "Cliente"]}
      >
        {/* <h1 className="text-center text-disabled">Crear pedido</h1> */}
        <InvoiceDataForm></InvoiceDataForm>
      </DashboardTemplate>
    </div>
  );
};
