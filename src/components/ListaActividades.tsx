import type { Actividad } from "../types";
import { categorias } from "../data/categorias";
import { useMemo, type Dispatch } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { ActividadAcciones } from "../reducers/actividad-reducer";

type ListaActividadesProps = {
  actividades: Actividad[];
  dispatch: Dispatch<ActividadAcciones>;
};
export default function ListaActividades({
  actividades,
  dispatch,
}: ListaActividadesProps) {
  const nombreCategoria = useMemo(
    () => (categoria: Actividad["categoria"]) =>
      categorias.map((cat) => (cat.id === categoria ? cat.name : "")),
    [actividades]
  );

  const estaVacio = useMemo(() => actividades.length === 0, [actividades]);

  return (
    <>
      <h2 className="text-4xl font-bold text-shadow-slate-600 text-center">
        Comida - Actividades
      </h2>

      {estaVacio ? (
        <p className="text-center my-8">No hay actividades aún...</p>
      ) : (
        actividades.map((actividad) => (
          <div
            className="px-5 py-10 bg-white mt-5 flex justify-between"
            key={actividad.id}
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  actividad.categoria === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {nombreCategoria(+actividad.categoria)}
              </p>
              <p className="text-2xl font-bold pt-5">{actividad.nombre}</p>
              <p className="font-black text-4xl text-lime-500">
                {actividad.calorias} <span>Calorías</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "editar-actividad-id",
                    payload: { id: actividad.id },
                  })
                }
              >
                <PencilSquareIcon className="h-6 w-8 text-gray-800 cursor-pointer" />
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "eliminar-actividad-id",
                    payload: { id: actividad.id },
                  })
                }
              >
                <TrashIcon className="h-6 w-8 text-red-800 cursor-pointer" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
