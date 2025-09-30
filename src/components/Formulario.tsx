import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { categorias } from "../data/categorias";
import type { Actividad } from "../types";
import type {
  ActividadAcciones,
  ActividadEstado,
} from "../reducers/actividad-reducer";

type FormularioProps = {
  dispatch: Dispatch<ActividadAcciones>;
  state: ActividadEstado;
};

export default function Formulario({ dispatch, state }: FormularioProps) {
  const estadoInicial: Actividad = {
    id: uuidv4(),
    categoria: 1,
    nombre: "",
    calorias: 0,
  };
  const [actividad, setActividad] = useState<Actividad>(estadoInicial);

  useEffect(() => {
    if (state.actividadId) {
      const actividadSeleccionada = state.actividades.filter(
        (stateActividad) => stateActividad.id === state.actividadId
      )[0];
      setActividad(actividadSeleccionada);
    }
  }, [state.actividadId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const esCampoNumerico = ["categoria", "calorias"].includes(e.target.id);
    setActividad({
      ...actividad,
      [e.target.id]: esCampoNumerico ? +e.target.value : e.target.value,
    });
  };

  const esActividadValida = () => {
    const { nombre, calorias } = actividad;
    return nombre.trim() !== "" && calorias > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "guardar-actividad",
      payload: { nuevaActividad: actividad },
    });
    setActividad({ ...estadoInicial, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="categoria" className="font-bold">
          Categoría
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="categoria"
          value={actividad.categoria}
          onChange={handleChange}
        >
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="nombre" className="font-bold">
          Actividad
        </label>
        <input
          type="text"
          id="nombre"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Comida, Juego de naranja, Pesas"
          value={actividad.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calorias" className="font-bold">
          Calorías
        </label>
        <input
          type="number"
          id="calorias"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="300, 500, 700"
          value={actividad.calorias}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full font-bold p-2 cursor-pointer text-white uppercase disabled:opacity-10"
        value={
          actividad.categoria === 1 ? "Guardar comida" : "Guardar ejercicio"
        }
        disabled={!esActividadValida()}
      />
    </form>
  );
}
