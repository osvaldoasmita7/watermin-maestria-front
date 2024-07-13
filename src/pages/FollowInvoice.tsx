import { useCallback, useEffect, useState } from "react";
import { DashboardTemplate } from "../components/DashboardTemplate";
import { itemsMenu } from "../data/itemsMenu";
import { Follow } from "../components/Follow";
import { IInvoice } from "../interfaces";
import { useDatabase } from "../hooks/useDatabase";
import { useQuery } from "../helpers/useQuery";

export const FollowInvoice = () => {
  const [invoice, setInvoice] = useState<IInvoice>();
  const { getInvoice } = useDatabase();
  const query = useQuery();
  const id = query.get("id");
  const timeoutID = setTimeout(() => {
    getData();
  }, 20000);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
  const getData = useCallback(async () => {
    if (id) {
      const inv = await getInvoice(id);

      if (inv) {
        setInvoice(inv);
      }
    }
  }, [id]);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <DashboardTemplate
        itemsHeader={itemsMenu}
        withRouteHeader={true}
        //   Esto es para saber cual es la ruta actual, el último es el más actual
        routes={["Pedidos", "Cliente", "Nuevo Pedido"]}
      >
        {invoice?.id_status === 5 ? (
          <h5 className="text-danger">
            El pedido no. {id} fue cancelado, no es necesaria ninguna acción
          </h5>
        ) : (
          <Follow status={invoice?.id_status ? invoice.id_status : 0}></Follow>
        )}
      </DashboardTemplate>
    </div>
  );
};
