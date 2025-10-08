import { useEffect, useMemo } from "react";
import Formulario from "./components/Formulario";
import ListaActividades from "./components/ListaActividades";
import EstadisticasCalorias from "./components/EstadisticasCalorias";
import { useActividad } from "./hooks/useActividad";

function App() {
  const { state, dispatch } = useActividad();

  useEffect(() => {
    localStorage.setItem("actividades", JSON.stringify(state.actividades));
  }, [state.actividades]);

  const puedeReiniciar = () =>
    useMemo(() => state.actividades.length > 0, [state.actividades]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl flex justify-between mx-auto items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador Calorias
          </h1>

          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 cursor-pointer text-white font-bold uppercase rounded-lg text-sm disabled:opacity-10"
            disabled={!puedeReiniciar()}
            onClick={() => dispatch({ type: "reiniciar-app" })}
          >
            Reiniciar app
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Formulario />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <EstadisticasCalorias />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ListaActividades />
      </section>
    </>
  );
}

export default App;
