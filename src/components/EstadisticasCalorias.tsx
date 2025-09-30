import { useMemo } from "react";
import type { Actividad } from "../types";
import DetalleCalorias from "./DetalleCalorias";

type EstadisticasCaloriasProps = {
  actividades: Actividad[];
};
export default function EstadisticasCalorias({
  actividades,
}: EstadisticasCaloriasProps) {
  //Contadores
  const caloriasConsumidas = useMemo(
    () =>
      actividades.reduce(
        (total, actividad) =>
          actividad.categoria === 1 ? total + actividad.calorias : total,
        0
      ),
    [actividades]
  );

  const caloriasQuemadas = useMemo(
    () =>
      actividades.reduce(
        (total, actividad) =>
          actividad.categoria === 2 ? total + actividad.calorias : total,
        0
      ),
    [actividades]
  );

  const total = useMemo(
    () => caloriasConsumidas - caloriasQuemadas,
    [actividades]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorías
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <DetalleCalorias calorias={caloriasConsumidas} texto="Consumidas" />
        <DetalleCalorias calorias={caloriasQuemadas} texto="Quemadas" />
        <DetalleCalorias calorias={total} texto="Diferencia" />
      </div>
    </>
  );
}
