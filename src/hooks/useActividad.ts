import { useContext } from "react";
import { ActividadContext } from "../context/ActividadContext";

export const useActividad = () => {
  const contexto = useContext(ActividadContext);
  if (!contexto) {
    throw new Error(
      "El hook useActividad debe ser utilizado en un ActividadProvider"
    );
  }
  return contexto;
};
