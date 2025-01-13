import { Clock, MapPin, Plus } from "lucide-react";

export default function FormReserv() {
  return (
    <div className="flex-none w-full md:w-[400px] md:ml-auto sticky translate-x-9 top-0">
      <div className="w-full border-[#4263EB] border-2 rounded-[2rem] p-8 bg-white shadow-lg">
        <div className="text-sm text-[#4263EB] font-medium mb-4">
          Argentina, Paraguay, Brasil, Chile
        </div>
        <h2 className="text-2xl font-bold mb-8">Reserva tu Viaje</h2>
        <form className="space-y-6">
          <div className="space-y-6">
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Lugar de Partida"
                className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Plus className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Agregar Parada Extra"
                className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Destino"
                className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="date"
                  className="w-full py-3 px-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full py-3 bg-[#4263EB] hover:bg-[#3651c9] text-white rounded-2xl font-medium"
            >
              Iniciar Viaje
            </button>
            <button
              type="button"
              className="w-full py-3 rounded-2xl border-2 border-[#4263EB] text-[#4263EB] hover:bg-[#4263EB] hover:text-white font-medium"
            >
              Contactar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
