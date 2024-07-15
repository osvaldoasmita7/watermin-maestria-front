import { Col, List, Row, Select } from "antd";

import { useContext, useEffect, useState } from "react";

import { Product } from "./Product";
import { ICart, companiesAttributes, productsAttributes } from "../interfaces";
import { InvoiceContext } from "../contexts/InvoiceContext";
import { useDatabase } from "../hooks/useDatabase";
import { useCart } from "../hooks/useCart";
import { Address } from "./Address";
import { TotalSum } from "./TotalSum";
import { ItemCart } from "./ItemCart";
import { useNavigate } from "react-router-dom";

//   city: "Ciudad de México",
//   cologne: "El Rodeo",
//   created_by: 1,
//   createdBy: 1,
//   delegation: "Iztacalco",
//   exterior: "123",
//   id_company: 0,
//   idStatus: -1,
//   interior: "asd",
//   name: "osvaldo",
//   postalcode: "08510",
//   street: "asdasd",
//   total: 0,
// };
export const InvoiceForm = () => {
  const { invoice, setInvoice } = useContext(InvoiceContext);
  const [companies, setCompanies] = useState<companiesAttributes[]>([]);
  const [products, setProducts] = useState<productsAttributes[]>([]);
  const { getCompanies, getProductsByCompanyId, saveInvoice } = useDatabase();
  const { addCart, restCart, sumTotal, cart, resetCart } = useCart();
  const navigate = useNavigate();

  // Traemos las empresas registradas por el código postal que registró la persona
  useEffect(() => {
    if (!invoice?.postalcode) return navigate("/pedidos/cliente");
    getCompanies(invoice?.postalcode || "", (companies_response) => {
      setCompanies([...companies_response]);
      if (!companies_response.length)
        alert(
          "No tenemos cobertura aún en ese código postal. No podemos ayudarte en estos momentos"
        );
    });
  }, []);

  const getProducts = async (companyId: string) => {
    const prods: productsAttributes[] = await getProductsByCompanyId(companyId);
    setProducts([...prods]);
    setInvoice({ ...invoice, id_company: +companyId });
    resetCart();
  };
  const SaveInvoice = async () => {
    try {
      console.log(cart);
      // return;
      const { id } = await saveInvoice({ invoice, orders: cart });
      if (id) {
        alert("Orden creada con éxito");
        return navigate("/pedidos");
      }
      alert("No se pudo crear el pedido, intenta más tarde");
    } catch ({ error }: any) {
      alert("Ocurrió un error:  " + error);
    }
  };
  return (
    <>
      <Address
        city={invoice?.city || ""}
        cologne={invoice?.cologne || ""}
        delegation={invoice?.delegation || ""}
        exterior={invoice?.exterior || ""}
        interior={invoice?.interior || ""}
        name={invoice?.name || ""}
        postalcode={invoice?.postalcode || ""}
        street={invoice?.street || ""}
      >
        <Select
          placeholder="Selecciona la sucursal"
          className="mb-4"
          onChange={getProducts}
        >
          <Select.Option value="" selected disabled>
            --
          </Select.Option>
          {companies.map((x: companiesAttributes) => (
            <Select.Option value={x.id}>{x.name}</Select.Option>
          ))}
        </Select>
      </Address>

      <Row className="row">
        <Col className="col-12 col-lg-3">
          <List
            bordered={true}
            header={<div>Tu carrito</div>}
            footer={
              <div>
                <br></br>
                {cart.length ? (
                  <TotalSum total={sumTotal()} funcion={SaveInvoice} />
                ) : (
                  ""
                )}
              </div>
            }
            dataSource={cart}
            renderItem={(item: ICart, index: number) => (
              <List.Item>
                <ItemCart
                  name={item.name}
                  quantity={item.quantity}
                  total={item.total}
                  onRest={() => restCart(index)}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col className="col-12 col-md-6 col-lg-9 mx-auto row">
          {/*  */}
          {products.map((product) => (
            <Product onClick={addCart} product={product}></Product>
          ))}
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};
