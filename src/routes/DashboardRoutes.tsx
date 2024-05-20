import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { routesPages } from "../constrains/PublicRoutePages";

export const DashboardRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        <Routes>
          {routesPages.map(
            (route) =>
              user?.type_id && (
                <Route path={route.path} element={route.element} />
              )
          )}
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};
