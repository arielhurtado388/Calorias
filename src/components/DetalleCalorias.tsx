type DetalleCaloriasProps = {
  calorias: number;
  texto: string;
};

export default function DetalleCalorias({
  calorias,
  texto,
}: DetalleCaloriasProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl text-orange"> {calorias}</span>
      {texto}
    </p>
  );
}
