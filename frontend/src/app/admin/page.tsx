"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Weather = {
  temp: number;
  description: string;
  icon: string;
} | null;

export default function AdminDashboard() {
  const [weather, setWeather] = useState<Weather>(null);
  const [time, setTime] = useState(new Date());

  const stats = [
    { name: "Total Usuarios", value: "1,234" },
    { name: "Reservas Nuevas", value: "120" },
    { name: "Ingresos Totales", value: "$123,456" },
    { name: "Choferes Activos", value: "89" },
  ];

  const quickLinks = [
    { name: "Reservas", icon: "📅", href: "/admin/bookings" },
    { name: "Vehículos", icon: "🚗", href: "/admin/cars" },
    { name: "Roles y Permisos", icon: "⚙️", href: "/admin/permissions" },
  ];

  useEffect(() => {
    // Actualizar la hora cada segundo
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Obtener clima para Misiones, Puerto Iguazú
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Puerto%20Iguazu&appid=0916e6b7a9ec0b89f856111c2af69155&units=metric&lang=es`
        );
        const data = await response.json();
        console.log(data); // Depuración: ver la estructura de la API
        if (data.main && data.weather) {
          setWeather({
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        } else {
          console.error("Datos incompletos de la API:", data);
        }
      } catch (error) {
        console.error("Error al obtener el clima:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Información de clima y hora */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          {weather ? (
            <div className="flex items-center space-x-2">
              {/* <Image
                                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                alt="icono del clima"
                                width={40}
                                height={40}
                            /> */}
              <p className="text-lg font-medium text-gray-900">
                {weather.temp}°C, {weather.description}
              </p>
            </div>
          ) : (
            <p className="text-lg font-medium text-gray-500">
              Cargando clima...
            </p>
          )}
        </div>
        <div className="mt-4 md:mt-0 text-lg font-medium text-gray-900">
          🕒{" "}
          {time.toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>

      {/* Sección de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            className="bg-white p-6 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-medium text-gray-500">{stat.name}</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Sección de accesos rápidos */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Accesos Rápidos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-lg shadow flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-3xl">{link.icon}</span>
            <span className="text-lg font-medium">{link.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
