import type { FormProps, NotificationArgsProps } from "antd";
import { Button, Checkbox, Col, Form, Input, Row, notification } from "antd";
import { FieldType } from "../types/FieldInputType";
import { InputCustom } from "./InputCustom";
import { LoginOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { useNotification } from "../hooks/useNotification";

interface IFormLogin {
  name: string;
  password: string;
  rememberme: boolean;
}
export const DataForm = () => {
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
    rememberme: false,
  });
  const { name, password, rememberme } = form;

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
              <Input value={name} onChange={handleChange} />
            </InputCustom>
            <InputCustom
              label="Contraseña"
              name={"password"}
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
              ]}
            >
              <Input value={password} onChange={handleChange} />
            </InputCustom>

            <InputCustom
              valuePropName="checked"
              label=""
              name={"remember"}
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox checked={rememberme} onChange={handleChangeCheckBox}>
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
