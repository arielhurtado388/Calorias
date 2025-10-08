import DetalleCalorias from "./DetalleCalorias";
import { useActividad } from "../hooks/useActividad";

export default function EstadisticasCalorias() {
  const { caloriasConsumidas, caloriasQuemadas, total } = useActividad();

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
