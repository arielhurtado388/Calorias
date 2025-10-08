import {
  createContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  actividadReducer,
  estadoInicial,
  type ActividadAcciones,
  type ActividadEstado,
} from "../reducers/actividad-reducer";
import { categorias } from "../data/categorias";
import type { Actividad } from "../types";

type ActividadProviderProps = {
  children: ReactNode;
};
type ActividadContextProps = {
  state: ActividadEstado;
  dispatch: Dispatch<ActividadAcciones>;
  caloriasConsumidas: number;
  caloriasQuemadas: number;
  total: number;
  nombreCategoria: (categoria: number) => string[];
  estaVacio: boolean;
};
export const ActividadContext = createContext<ActividadContextProps>(null!); // o puedo poner: {} as ActividadContextProps

export const ActividadProvider = ({ children }: ActividadProviderProps) => {
  const [state, dispatch] = useReducer(actividadReducer, estadoInicial);

  //Contadores
  const caloriasConsumidas = useMemo(
    () =>
      state.actividades.reduce(
        (total, actividad) =>
          actividad.categoria === 1 ? total + actividad.calorias : total,
        0
      ),
    [state.actividades]
  );

  const caloriasQuemadas = useMemo(
    () =>
      state.actividades.reduce(
        (total, actividad) =>
          actividad.categoria === 2 ? total + actividad.calorias : total,
        0
      ),
    [state.actividades]
  );

  const total = useMemo(
    () => caloriasConsumidas - caloriasQuemadas,
    [state.actividades]
  );

  const nombreCategoria = useMemo(
    () => (categoria: Actividad["categoria"]) =>
      categorias.map((cat) => (cat.id === categoria ? cat.name : "")),
    [state.actividades]
  );

  const estaVacio = useMemo(
    () => state.actividades.length === 0,
    [state.actividades]
  );

  return (
    <ActividadContext.Provider
      value={{
        state,
        dispatch,
        caloriasConsumidas,
        caloriasQuemadas,
        total,
        nombreCategoria,
        estaVacio,
      }}
    >
      {children}
    </ActividadContext.Provider>
  );
};
