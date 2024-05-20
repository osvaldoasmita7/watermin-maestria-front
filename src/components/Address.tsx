import { Card, Col, Row, Statistic } from "antd";
import { invoicesAttributes } from "../interfaces";
import { ArrowUpOutlined } from "@ant-design/icons";
interface Props {
  city: string;
  cologne: string;
  delegation: string;
  exterior: string;
  interior: string;
  name: string;
  postalcode: string;
  street: string;
  children?: any;
}
export const Address = ({
  city,
  cologne,
  delegation,
  exterior,
  interior,
  name,
  postalcode,
  street,
  children,
}: Props) => {
  return (
    <Card title="Datos de entrega" className="mb-5">
      <p>Nombre: {name}</p>
      <p>
        Calle: {street} {exterior} {interior ?? interior}
      </p>
      <p>Colonia: {cologne}</p>
      <p>Alcaldía: {delegation}</p>
      <p>Ciudad: {city}</p>
      <p>Código Postal: {postalcode}</p> {children}
    </Card>
  );
};
