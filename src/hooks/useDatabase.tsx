import axios from "axios";
import { useCallback } from "react";
import {
  IInvoice,
  companiesAttributes,
  invoicesAttributes,
  productsAttributes,
} from "../interfaces";

export const useDatabase = () => {
  const getCompanies = useCallback(
    async (postalCode: string, callback: (values: any) => void) => {
      postalCode = `${postalCode}`.length <= 4 ? `0${postalCode}` : postalCode;
      console.log(postalCode);
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/companies?postalCode=" + postalCode,
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };
      const resp = await axios.request(config);
      if (!resp.data?.ok) throw "Error en la petición";
      const response = resp.data;
      const res = response.companies as companiesAttributes[];
      if (callback) callback(res);
      return res;
    },
    []
  );
  const getProductsByCompanyId = useCallback(
    async (postalCode: string, callback?: (values: any) => void) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/products?id__company=" + postalCode,
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };
      const resp = await axios.request(config);
      if (!resp.data?.ok) throw "Error en la petición";
      const response = resp.data;
      const res = response.products as productsAttributes[];
      if (callback) callback(res);
      return res;
    },
    []
  );
  const updateInvoice = async (
    data: IInvoice,
    callback = (values: any) => {}
  ) => {
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/invoices",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      data,
    };
    const resp = await axios.request(config);
    if (!resp.data?.ok) throw "Error en la petición";
    const response = resp.data;
    const res = response as invoicesAttributes;

    if (callback) callback(res);
    return res;
  };
  const saveInvoice = useCallback(
    async (data: any, callback?: (values: any) => void) => {
      console.log("data", JSON.stringify(data));

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/invoices",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        data,
      };
      const resp = await axios.request(config);
      if (!resp.data?.ok) throw "Error en la petición";
      const response = resp.data;
      const res = response as invoicesAttributes;

      if (callback) callback(res);
      return res;
    },
    []
  );
  const getInvoices = async (params?: string) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/invoices?" + params,
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const resp = await axios.request(config);
    if (!resp.data?.ok) throw "Error en la petición";
    const response = resp.data;
    return response.invoices as IInvoice[];
  };
  const getInvoice = async (id: string) => {
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
    return resp.data as IInvoice;
  };
  const getcompaniesByUserId = async (userId: number) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/invoices/get-companies/" + userId,
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const resp = await axios.request(config);
    if (!resp.data?.ok) throw "Error en la petición";
    const response = resp.data;
    return response.companies as companiesAttributes[];
  };
  return {
    getCompanies,
    getProductsByCompanyId,
    saveInvoice,
    getInvoices,
    updateInvoice,
    getcompaniesByUserId,
    getInvoice,
  };
};
