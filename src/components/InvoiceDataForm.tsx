import { Button, Col, Form, Input, Row, Select } from "antd";
import { InputCustom } from "./InputCustom";
import { RightOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { CardComponent } from "./CardComponent";
// import { useNotification } from "../hooks/useNotification";
import { items } from "../data/ColumnsFormInvoiceData";
import { IAddressForm, IPostalCode } from "../interfaces";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { InvoiceContext } from "../contexts/InvoiceContext";
import { usePostalCode } from "../hooks/usePostalCode";
import { useForm } from "../hooks/useForm";

export const InvoiceDataForm = () => {
  // Estados
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
  // Contextos
  const { user } = useContext(AuthContext);
  const { getLastInvoice, setInvoice } = useContext(InvoiceContext);
  // Hooks
  const { searchCP, setColonia, postalCodes } = usePostalCode();
  const { onFinish, onFinishFailed } = useForm();
  // Navegación
  const navigate = useNavigate();
  // Manejador de valores
  const handleChange = (event: any) => {
    console.log("Event", event);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (user?.id) getLastInvoice(user?.id);
  }, [user?.id]);

  const mapToProps = () => {
    setInvoice({
      city: form.city,
      cologne: form.colonia,
      created_by: user?.id,
      createdBy: user?.id,
      delegation: form.delegacion,
      exterior: form.ext,
      id: 0,
      id_company: 0,
      idStatus: -1,
      interior: form.interior,
      name: form.name,
      postalcode: form.postalCode,
      street: form.street,
      total: 0,
    });
    navigate("/pedidos/cliente/nuevo-pedido");
  };
  return (
    <Row>
      {/* {contextHolder} */}
      <Col sm={24} lg={12} xl={9} xs={24} className="mx-auto my-5">
        <CardComponent bordered={false} title="Datos de entrega">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={(values) => onFinish(values, mapToProps)}
            onFinishFailed={(values) => onFinishFailed(values)}
            autoComplete="off"
          >
            {items.map((item) => {
              return (
                <InputCustom
                  label={
                    item.label +
                    `${
                      item.rules?.length
                        ? item.rules[0].required
                          ? "*"
                          : ""
                        : ""
                    }`
                  }
                  rules={item.rules}
                >
                  {item.type == "input" ? (
                    <Input
                      required={
                        item.rules?.length ? item.rules[0].required : false
                      }
                      // @ts-ignore
                      name={[item.name]}
                      // @ts-ignore
                      value={form[item.name]}
                      onChange={handleChange}
                      onBlur={(event) => {
                        if (event.target.name === "postalCode")
                          searchCP(event.target.value, () => {
                            setForm({
                              ...form,
                              colonia: "",
                              delegacion: "",
                              city: "",
                              postalCode: event.target.value,
                            });
                          });
                        handleChange(event);
                      }}
                      disabled={item.disabled}
                      type={item.valueType || "text"}
                    />
                  ) : item.type == "select" ? (
                    <Select
                      onChange={(value: any) => {
                        if (item.name === "colonia") {
                          setColonia(value, (colonia) => {
                            setForm({
                              ...form,
                              postalCode: colonia?.cp || "",
                              city: colonia?.ciudad || "",
                              colonia: colonia?.colonia || "",
                              delegacion: colonia?.municipio || "",
                            });
                          });
                        } else {
                          handleChange({
                            target: {
                              value,
                              name: item.name,
                            },
                          });
                        }
                      }} // @ts-ignore
                      name={[item.name]}
                      // @ts-ignore
                      value={form[item.name]}
                    >
                      <Select.Option value="">---</Select.Option>
                      {item.name == "colonia" &&
                        postalCodes.map((x: IPostalCode) => (
                          <Select.Option value={x.id_cat}>
                            {x.colonia}
                          </Select.Option>
                        ))}
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
