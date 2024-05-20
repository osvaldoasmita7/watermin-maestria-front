import { useCallback, useState } from "react";
import { IPostalCode } from "../interfaces";
import axios from "axios";

export const usePostalCode = () => {
  const [postalCodes, setPostalCodes] = useState<IPostalCode[]>([]);

  const setColonia = (
    value: number,
    callback?: (values: IPostalCode) => void
  ) => {
    const colonia: IPostalCode | undefined = postalCodes.find(
      (x: IPostalCode) => x.id_cat === value
    );
    if (!colonia) return null;

    if (callback) callback(colonia);
  };
  // Busqueda de CP
  const searchCP = useCallback(
    async (postalCode: string = "", callback?: () => void) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/postal-codes?postal-code=" + postalCode,
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      };
      const resp = await axios.request(config);
      if (!resp.data?.ok) throw "Error en la petición";
      const response = resp.data;
      const postalCodesResponce = response.cps as IPostalCode[];
      console.log(postalCodesResponce);
      setPostalCodes([...postalCodesResponce]);
      if (callback) callback();
    },
    []
  );
  return { setColonia, searchCP, postalCodes };
};
