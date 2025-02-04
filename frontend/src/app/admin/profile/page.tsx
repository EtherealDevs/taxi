"use client";

import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Drivers, useDriver } from "@/hooks/drivers";
import { use, useEffect, useState } from "react";
import AnimatedLoadingWheel from "@/components/ui/animated-loading-wheel";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Drivers[]>([]);
  const { getDrivers, deleteDriver } = useDriver();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDrivers();
        setDrivers(data.drivers);
      } catch (error) {
        console.error("Error al cargar los choferes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar esta publicación?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDriver(id);
      alert("Publicación eliminada correctamente");

      // Actualizar la lista de publicaciones después de la eliminación
      setDrivers((prevDrivers) =>
        prevDrivers.filter((driver) => driver.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      alert("No se pudo eliminar la publicación");
    }
  };
  if (loading) return <AnimatedLoadingWheel />;
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Choferes
        </h1>
        <Link href="/admin/profile/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Chofer
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers?.map((driver) => (
          <motion.div
            key={driver.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden"
          >
            <div className="relative">
              <Image
                src={driver.images[0]}
                alt={driver.name}
                width={400}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white dark:bg-neutral-900 rounded-full px-2 py-1 flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">
                  {driver.rating}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {driver.name}
              </h3>
              {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{driver.car}</p> */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 dark:bg-neutral-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                  {driver.languages}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                {/* <span>{driver.trips} viajes</span> */}
                {/* <span className={`px-3 py-1 rounded-full text-xs ${driver.status === 'Activo'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}>
                                    {driver.status}
                                </span> */}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/profile/edit/${driver.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(driver.id)}
                  variant="destructive"
                  size="icon"
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
