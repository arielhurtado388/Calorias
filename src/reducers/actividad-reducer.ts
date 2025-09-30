import type { Actividad } from "../types";

export type ActividadAcciones =
  | {
      type: "guardar-actividad";
      payload: { nuevaActividad: Actividad };
    }
  | {
      type: "editar-actividad-id";
      payload: { id: Actividad["id"] };
    }
  | {
      type: "eliminar-actividad-id";
      payload: { id: Actividad["id"] };
    }
  | {
      type: "reiniciar-app";
    };

export type ActividadEstado = {
  actividades: Actividad[];
  actividadId: Actividad["id"];
};

const localStorageActividades = (): Actividad[] => {
  const actividades = localStorage.getItem("actividades");
  return actividades ? JSON.parse(actividades) : [];
};

export const estadoInicial: ActividadEstado = {
  actividades: localStorageActividades(),
  actividadId: "",
};

export const actividadReducer = (
  state: ActividadEstado = estadoInicial,
  action: ActividadAcciones
) => {
  if (action.type === "guardar-actividad") {
    let actividadesActualizadas: Actividad[] = [];
    if (state.actividadId) {
      actividadesActualizadas = state.actividades.map((actividad) =>
        actividad.id === state.actividadId
          ? action.payload.nuevaActividad
          : actividad
      );
    } else {
      actividadesActualizadas = [
        ...state.actividades,
        action.payload.nuevaActividad,
      ];
    }
    return {
      ...state,
      actividades: actividadesActualizadas,
      actividadId: "",
    };
  }

  if (action.type === "editar-actividad-id") {
    return {
      ...state,
      actividadId: action.payload.id,
    };
  }

  if (action.type === "eliminar-actividad-id") {
    return {
      ...state,
      actividades: state.actividades.filter(
        (actividad) => actividad.id !== action.payload.id
      ),
    };
  }

  if (action.type === "reiniciar-app") {
    return {
      actividades: [],
      actividadId: "",
    };
  }

  return state;
};
