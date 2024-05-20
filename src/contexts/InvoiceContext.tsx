import { Dispatch, createContext, useState } from "react";
import { invoicesAttributes } from "../interfaces";
import axios from "axios";
interface IAuth {
  invoice?: invoicesAttributes;
  setInvoice: Dispatch<React.SetStateAction<invoicesAttributes>>;
  saveInvoice: (data: invoicesAttributes) => Promise<invoicesAttributes>;
  getInvoice: (id: number) => Promise<invoicesAttributes>;
  getLastInvoice: (userId: number) => Promise<invoicesAttributes>;
  resetState: () => void;
}
interface Props {
  children: any;
}

const INITIAL_STATE: invoicesAttributes = {
  id: 0,
  date: "",
  time: "",
  total: 0,
  createdBy: 0,
  created_by: 0,
  idStatus: 0,
  id_company: 0,

  name: "",
  postalcode: "",
  street: "",
  exterior: "",
  interior: "",
  city: "",
  delegation: "",
  cologne: "",
};
export const InvoiceContext = createContext<IAuth>({
  invoice: INITIAL_STATE,
  setInvoice: () => {},

  saveInvoice: async ({}: invoicesAttributes): Promise<invoicesAttributes> => {
    return INITIAL_STATE;
  },
  getInvoice: async ({}: number): Promise<invoicesAttributes> => {
    return INITIAL_STATE;
  },
  getLastInvoice: async ({}: number): Promise<invoicesAttributes> => {
    return INITIAL_STATE;
  },
  resetState: () => {},
});

export const InvoiceProvider = ({ children }: Props) => {
  const [invoice, setInvoice] = useState<invoicesAttributes>(INITIAL_STATE);

  const saveInvoice = async (form: invoicesAttributes) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/invoices",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(form),
      };
      const resp = await axios.request(config);
      const response = resp.data as invoicesAttributes;
      setInvoice({ ...response });
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  const getLastInvoice = async (userId: number) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "http://localhost:3000/api/invoices/last-invoice?created_by=" + userId,
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const resp = await axios.request(config);
    if (!resp.data?.ok) throw "Error en la petición";
    const response = resp.data;
    const invoice_response = response as invoicesAttributes;
    console.log(invoice_response);
    setInvoice({
      ...invoice,
      cologne: invoice_response.cologne!,
      delegation: invoice_response.delegation!,
      city: invoice_response.city!,
      street: invoice_response.street!,
      exterior: invoice_response.exterior!,
      interior: invoice_response.interior!,
      postalcode: invoice_response.postalcode!,
      name: invoice_response.name!,
    });
    return invoice_response;
  };
  const getInvoice = async (id: number) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/invoices/" + id,
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const resp = await axios.request(config);
    if (!resp.data?.ok) throw "Error en la petición";
    const response = resp.data;
    const invoice_response = response as invoicesAttributes;
    console.log(invoice_response);
    setInvoice({
      ...invoice,
      cologne: invoice_response.cologne!,
      delegation: invoice_response.delegation!,
      city: invoice_response.city!,
      street: invoice_response.street!,
      exterior: invoice_response.exterior!,
      interior: invoice_response.interior!,
      postalcode: invoice_response.postalcode!,
      name: invoice_response.name!,
    });
    return invoice_response;
  };
  const resetState = () => {
    setInvoice(INITIAL_STATE);
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        setInvoice,
        saveInvoice,
        getLastInvoice,
        getInvoice,
        resetState,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
