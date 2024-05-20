import { ItemsInvoiceForm } from "../interfaces";

export const items: ItemsInvoiceForm[] = [
  {
    label: "Nombre",
    name: "name",
    rules: [
      {
        required: true,
        message: "Por favor ingresa el nombre del solicitante",
      },
    ],
    type: "input",
  },
  {
    label: "Código postal",
    name: "postalCode",
    rules: [
      {
        required: true,
        message: "Por favor ingresa el código postal",
      },
    ],
    type: "input",
    valueType: "number",
  },
  {
    label: "Colonia",
    name: "colonia",
    rules: [
      {
        required: true,
        message: "Por favor selecciona la colonia",
      },
    ],
    type: "select",
  },
  {
    label: "Ciudad",
    name: "city",
    rules: [
      {
        required: true,
        message: "Por favor ingresa el código postal para continuar",
      },
    ],
    type: "input",
    disabled: true,
  },
  {
    label: "Delegación/Alcaldía",
    name: "delegacion",
    rules: [
      {
        required: true,
        message: "Por favor ingresa el código postal para continuar",
      },
    ],
    type: "input",
    disabled: true,
  },
  {
    label: "Calle",
    name: "street",
    rules: [
      {
        required: true,
        message: "Por favor selecciona la calle",
      },
    ],
    type: "input",
  },
  {
    label: "Exterior",
    name: "ext",
    rules: [
      {
        required: true,
        message: "Por favor ingresa el exterior",
      },
    ],
    type: "input",
  },
  {
    label: "Interior",
    name: "interior",
    type: "input",
  },
];
