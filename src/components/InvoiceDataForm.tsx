import type { FormProps } from "antd";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { FieldType } from "../types/FieldInputType";
import { InputCustom } from "./InputCustom";
import { RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CardComponent } from "./CardComponent";
import { useNotification } from "../hooks/useNotification";
import { items } from "../data/ColumnsFormInvoiceData";

interface IAddressForm {
  name: string;
  street: string;
  ext: string;
  interior: string;
  postalCode: string;
  colonia: string;
  delegacion: string;
  city: string;
}
export const InvoiceDataForm = () => {
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
  const [form, setForm] = useState<IAddressForm>({
    name: "",
    city: "",
    colonia: "",
    delegacion: "",
    ext: "",
    interior: "",
    postalCode: "",
    street: "",
  });

  const handleChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const { name, city, colonia, delegacion, ext, interior, postalCode, street } =
    form;

  return (
    <Row>
      {contextHolder}
      <Col sm={24} lg={12} xl={9} xs={24} className="mx-auto my-5">
        <CardComponent bordered={false} title="Datos de entrega">
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
            {items.map((item) => {
              return (
                <InputCustom
                  label={item.label}
                  name={item.name}
                  rules={item.rules}
                >
                  {item.type == "input" ? (
                    <Input
                      value={name}
                      onChange={handleChange}
                      disabled={item.disabled}
                      type={item.valueType || "text"}
                    />
                  ) : item.type == "select" ? (
                    <Select onChange={() => {}}>
                      <Select.Option value="">---</Select.Option>
                      <Select.Option value="sample">Sample</Select.Option>
                    </Select>
                  ) : (
                    ""
                  )}
                </InputCustom>
              );
            })}

            <InputCustom wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                shape="round"
                icon={<RightOutlined />}
                size={"large"}
                htmlType="submit"
              >
                Siguiente
              </Button>
            </InputCustom>
          </Form>
        </CardComponent>
      </Col>
    </Row>
  );
};
