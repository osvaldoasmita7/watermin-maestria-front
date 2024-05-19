import { Dispatch, createContext, useEffect, useState } from "react";
import { IFormLogin, ILogin, companiesAttributes } from "../interfaces";
import axios from "axios";
interface IAuth {
  user?: IUser;
  setUser: Dispatch<React.SetStateAction<IUser>>;
  login: (data: IFormLogin) => Promise<UserResponse>;
  verifyToken?: () => Promise<boolean>;
  register: (data: IFormLogin) => Promise<UserResponse>;
}
interface IUser {
  id: number;
  username: string;
  token?: string;
  type_id?: number;
  active?: number;
  companies?: companiesAttributes[];
}
interface Props {
  children: any;
}
interface UserResponse {
  username: string;
  id: number;
  token: string;
  active: number;
  type_id: number;
}
// const INITIAL_AUTH: IUser = {
//   username: "osvaldoasmita7@gmail.com",
//   id: 1,
//   type_id: 1,
//   token:
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9zdmFsZG9hc21pdGE3QGdtYWlsLmNvbSIsImlkIjoxLCJ0eXBlX2lkIjoxLCJhY3RpdmUiOjEsImlhdCI6MTcxNTg3MDIwNiwiZXhwIjoxNzE1OTU2NjA2fQ.9WDOy_1CLDhanoIoj0sAh3BeOlW9ZufRCMex4a4FkS4",
//   active: 1,
// };
const INITIAL_AUTH: IUser = {
  id: 0,
  username: "",
  token: "",
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9zdmFsZG9hc21pdGE3QGdtYWlsLmNvbSIsImlkIjoxLCJ0eXBlX2lkIjoxLCJhY3RpdmUiOjEsImlhdCI6MTcxNTc5ODQxNSwiZXhwIjoxNzE1ODg0ODE1fQ.wef9OJYSFpOO_Q6SsUjZu9Tog-DE5romIOKLsBS_STk",
  type_id: 0,
  active: 0,
};
export const AuthContext = createContext<IAuth>({
  user: INITIAL_AUTH,
  setUser: () => {},
  verifyToken: async () => {
    return true;
  },
  login: async (data: IFormLogin): Promise<UserResponse> => {
    const obj: UserResponse = {
      type_id: 0,
      active: 0,
      id: 0,
      username: "",
      token: "",
    };
    return obj;
  },
  register: async (data: IFormLogin): Promise<UserResponse> => {
    const obj: UserResponse = {
      active: 0,
      id: 0,
      username: "",
      token: "",
      type_id: 0,
    };
    return obj;
  },
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>(INITIAL_AUTH);

  const verifyToken = async () => {
    try {
      const _token = localStorage.getItem("token") || "";
      // Si el token no existe
      if (!_token) throw "No hay token";
      // Si el token existe
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/auth/login/renew",
        headers: {
          "Content-Type": "application/json",
          token: _token,
        },
      };
      const resp = await axios.request(config);
      if (!resp.data?.ok) throw "Token inválido";
      const response = resp.data as ILogin;
      const user_response = response.user;
      const { active, id, username, token, type_id, companies } = user_response;
      localStorage.setItem("token", token);
      setUser({ active, id, username, token, type_id, companies });
      return true;
    } catch (error) {
      setUser(INITIAL_AUTH);
      return false;
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  const login = async (form: IFormLogin) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: form.username,
          active: 1,
          password: form.password,
        }),
      };
      const resp = await axios.request(config);
      const response = resp.data as ILogin;
      const user_response = response.user;
      const { id, active, username, token, type_id, companies } = user_response;
      localStorage.setItem("token", token);

      setUser({
        id: id,
        active: active,
        username: username,
        token: token,
        type_id: type_id,
        companies,
      });

      return user_response;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  const register = async (form: IFormLogin) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/auth/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: form.username,
          type_id: 1,
          active: 1,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      };
      const resp = await axios.request(config);
      const response = resp.data as ILogin;
      const user_response = response.user;
      setUser({
        ...user,
        id: user_response.id,
        active: user_response.active,
        username: user_response.username,
        token: user_response.token,
        type_id: user_response.type_id,
        companies: user.companies,
      });
      return user_response;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
