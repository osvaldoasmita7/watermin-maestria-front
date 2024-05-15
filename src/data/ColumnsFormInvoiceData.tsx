import { ItemsInvoiceForm } from "../interfaces";

export const items: ItemsInvoiceForm[] = [
  {
    label: "Nombre",
    name: "username",
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
    // disabled: true,
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
    // disabled: true,
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
];
