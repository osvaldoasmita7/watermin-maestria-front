import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
interface Props {
  children: any;
}
export const PublicRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.id) navigate("/dashboard");
  }, [user?.id]);
  return children;
};
