import { Dispatch, createContext, useState } from "react";
import { IFormLogin, ILogin } from "../interfaces";
import axios from "axios";
interface IAuth {
  user?: IUser;
  setUser: Dispatch<React.SetStateAction<IUser>>;
  login: (data: IFormLogin) => Promise<UserResponse>;
  register: (data: IFormLogin) => Promise<UserResponse>;
}
interface IUser {
  id: number;
  name: string;
  token?: string;
  type_id?: number;
  active?: number;
}
interface Props {
  children: any;
}
interface UserResponse {
  name: string;
  id: number;
  token: string;
  active: number;
  type_id: number;
}
const INITIAL_AUTH: IUser = {
  name: "osvaldoasmita7@gmail.com",
  id: 1,
  type_id: 1,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9zdmFsZG9hc21pdGE3QGdtYWlsLmNvbSIsImlkIjoxLCJ0eXBlX2lkIjoxLCJhY3RpdmUiOjEsImlhdCI6MTcxNTgxMjM4OCwiZXhwIjoxNzE1ODk4Nzg4fQ.HxCma14BSM5KYOhj01ur6xYp0Kij8FXh08Gg2_ry9Eg",
  active: 1,
};
// const INITIAL_AUTH: IUser = {
//   id: 0,
//   name: "",
//   token: "",
//   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9zdmFsZG9hc21pdGE3QGdtYWlsLmNvbSIsImlkIjoxLCJ0eXBlX2lkIjoxLCJhY3RpdmUiOjEsImlhdCI6MTcxNTc5ODQxNSwiZXhwIjoxNzE1ODg0ODE1fQ.wef9OJYSFpOO_Q6SsUjZu9Tog-DE5romIOKLsBS_STk",
//   type_id: 0,
//   active: 0,
// };
export const AuthContext = createContext<IAuth>({
  user: INITIAL_AUTH,
  setUser: () => {},
  login: async (data: IFormLogin): Promise<UserResponse> => {
    const obj: UserResponse = {
      type_id: 0,
      active: 0,
      id: 0,
      name: "",
      token: "",
    };
    return obj;
  },
  register: async (data: IFormLogin): Promise<UserResponse> => {
    const obj: UserResponse = {
      active: 0,
      id: 0,
      name: "",
      token: "",
      type_id: 0,
    };
    return obj;
  },
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>(INITIAL_AUTH);
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
          type_id: 1,
          active: 1,
          password: form.password,
        }),
      };
      const resp = await axios.request(config);
      const response = resp.data as ILogin;
      const user_response = response.user;
      setUser({
        id: user_response.id,
        active: user_response.active,
        name: user_response.name,
        token: user_response.token,
        type_id: user_response.type_id,
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
        name: user_response.name,
        token: user_response.token,
        type_id: user_response.type_id,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
