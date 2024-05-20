import { Navigate, Route } from "react-router-dom";

export const RedirectToIndex = () => {
  return (
    <Route>
      <Navigate to="/"></Navigate>;
    </Route>
  );
};
