import { DashboardTemplate } from "../components/DashboardTemplate";
import { itemsMenu } from "../data/itemsMenu";

export const Dashboard = () => {
  return (
    <div>
      <DashboardTemplate
        itemsHeader={itemsMenu}
        withRouteHeader={true}
        //   Esto es para saber cual es la ruta actual, el último es el más actual
        routes={["Inicio"]}
      >
        <h1 className="text-center text-disabled">Bienvenido a watermin</h1>
      </DashboardTemplate>
    </div>
  );
};
