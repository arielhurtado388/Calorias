import { useEffect, useMemo, useReducer } from "react";
import Formulario from "./components/Formulario";
import { actividadReducer, estadoInicial } from "./reducers/actividad-reducer";
import ListaActividades from "./components/ListaActividades";
import EstadisticasCalorias from "./components/EstadisticasCalorias";

function App() {
  const [state, dispatch] = useReducer(actividadReducer, estadoInicial);

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
          <Formulario dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <EstadisticasCalorias actividades={state.actividades} />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ListaActividades actividades={state.actividades} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
