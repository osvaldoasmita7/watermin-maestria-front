import type { FormProps, NotificationArgsProps } from "antd";
import { Button, Checkbox, Col, Form, Input, Row, notification } from "antd";
import { FieldType } from "../types/FieldInputType";
import { InputCustom } from "./InputCustom";
import { AppstoreAddOutlined, LoginOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { useNotification } from "../hooks/useNotification";

interface IFormLogin {
  name: string;
  password: string;
  confirmPassword: string;
}
export const RegisterForm = () => {
  const { contextHolder, openNotification } = useNotification();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    openNotification("top");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const [form, setForm] = useState<IFormLogin>({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const { name, password, confirmPassword } = form;

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
              <Input value={name} onChange={handleChange} />
            </InputCustom>
            <InputCustom
              label="Contraseña"
              name={"password"}
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
              ]}
            >
              <Input value={password} onChange={handleChange} type="password" />
            </InputCustom>
            <InputCustom
              label="Confirm. contraseña"
              name={"confirmPassword"}
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
              ]}
            >
              <Input
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
