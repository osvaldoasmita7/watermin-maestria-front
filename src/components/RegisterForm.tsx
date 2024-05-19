import type { FormProps } from "antd";
import { Button, Col, Form, Input, Row } from "antd";
import { FieldType } from "../types/FieldInputType";
import { InputCustom } from "./InputCustom";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { CardComponent } from "./CardComponent";
import { useNotification } from "../hooks/useNotification";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface IFormLogin {
  username: string;
  password: string;
  confirmPassword: string;
}
export const RegisterForm = () => {
  const { register, setUser } = useContext(AuthContext);
  const { contextHolder, openNotification } = useNotification();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async () => {
    try {
      const resp = await register({
        password: form.password,
        confirmPassword: form.confirmPassword,
        username: form.username,
        rememberme: true,
      });

      console.log("Success:", resp);
      openNotification("top", "bien");
      if (resp?.token) {
        setUser(resp);
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log("error", error);
      openNotification("top", error?.msg);
      console.log("error", error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const [form, setForm] = useState<IFormLogin>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { username, password, confirmPassword } = form;

  const handleChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row>
      {contextHolder}
      <Col sm={24} lg={12} xl={9} xs={24} className="mx-auto my-15">
        <CardComponent bordered={false} title="Registrate">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <InputCustom
              label="Email"
              name={"username"}
              rules={[
                { required: true, message: "Por favor ingresa el usuario" },
              ]}
            >
              <Input
                value={username}
                name={"username"}
                onChange={handleChange}
              />
            </InputCustom>
            <InputCustom
              label="Contraseña"
              name={"password"}
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
              ]}
            >
              <Input
                value={password}
                name={"password"}
                onChange={handleChange}
                type="password"
              />
            </InputCustom>
            <InputCustom
              label="Confirm. contraseña"
              name={"confirmPassword"}
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
              ]}
            >
              <Input
                name={"confirmPassword"}
                value={confirmPassword}
                onChange={handleChange}
                type="password"
              />
            </InputCustom>

            <InputCustom wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                shape="round"
                icon={<AppstoreAddOutlined />}
                size={"large"}
                htmlType="submit"
              >
                Registrar
              </Button>
            </InputCustom>
          </Form>
        </CardComponent>
      </Col>
    </Row>
  );
};
