import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
interface Props {
  children: any;
}
export const PrivateRoute = ({ children }: Props) => {
  const { user } = useContext(AuthContext);
  return user?.id && children;
};
