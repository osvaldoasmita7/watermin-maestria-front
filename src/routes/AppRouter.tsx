// import librerias
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { DashboardRoutes } from "./DashboardRoutes";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { routesPagesNoAuth } from "../constrains/PublicRoutePages";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {routesPagesNoAuth.map(
          (route) =>
            !user?.type_id && (
              <Route path={route.path} element={route.element} />
            )
        )}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
