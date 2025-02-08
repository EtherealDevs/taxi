"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCar, Car } from "@/hooks/cars";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const { getCars, deleteCar } = useCar();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getCars();
      setCars(response.cars);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar esta publicación?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCar(id);
      alert("Publicación eliminada correctamente");

      // Actualizar la lista de publicaciones después de la eliminación
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error al eliminar el Auto:", error);
      alert("No se pudo eliminar el Auto");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Autos
        </h1>
        <Link href="/admin/cars/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Auto
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <motion.div
            key={car.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden"
          >
            {/* <Image
              src={car.image}
              alt={`${car.make} ${car.model}`}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            /> */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {car.brand} {car.model}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Año: {car.year}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 dark:bg-neutral-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                  {car.type}
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-neutral-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                  {car.seats} asientos
                </span>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/cars/edit/${car.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(car.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
