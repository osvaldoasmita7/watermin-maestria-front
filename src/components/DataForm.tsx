import type { FormProps, NotificationArgsProps } from "antd";
import { Button, Checkbox, Col, Form, Input, Row, notification } from "antd";
import { FieldType } from "../types/FieldInputType";
import { InputCustom } from "./InputCustom";
import { LoginOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { CardComponent } from "./CardComponent";
import { useNotification } from "../hooks/useNotification";
import { AuthContext } from "../contexts/AuthContext";
import { IFormLogin } from "../interfaces";
import { useNavigate } from "react-router-dom";

export const DataForm = () => {
  const { login, setUser } = useContext(AuthContext);
  const [form, setForm] = useState<IFormLogin>({
    username: "",
    password: "",
    rememberme: false,
  });

  const { contextHolder, openNotification } = useNotification();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async () => {
    try {
      const resp = await login(form);
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

  const { username, password, rememberme } = form;

  const handleChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeCheckBox = (event: any) => {
    setForm({
      ...form,
      rememberme: event.target.checked,
    });
  };

  return (
    <Row>
      {contextHolder}
      <Col sm={24} lg={12} xl={9} xs={24} className="mx-auto my-15">
        <CardComponent bordered={false} title="Inicia sesión">
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
              label="Usuario"
              name={"username"}
              rules={[
                { required: true, message: "Por favor ingresa el usuario" },
              ]}
            >
              <Input name="username" value={username} onChange={handleChange} />
            </InputCustom>
            <InputCustom
              label="Contraseña"
              name={"password"}
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
              ]}
            >
              <Input name="password" value={password} onChange={handleChange} />
            </InputCustom>

            <InputCustom
              valuePropName="checked"
              label=""
              name={"remember"}
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox
                name="rememberme"
                checked={rememberme}
                onChange={handleChangeCheckBox}
              >
                Recuerdame
              </Checkbox>
            </InputCustom>

            <InputCustom wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                shape="round"
                icon={<LoginOutlined />}
                size={"large"}
                htmlType="submit"
              >
                Iniciar
              </Button>
            </InputCustom>
          </Form>
        </CardComponent>
      </Col>
    </Row>
  );
};
