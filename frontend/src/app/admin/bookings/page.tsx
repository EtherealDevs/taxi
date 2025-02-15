"use client";

import { useState, useEffect, useMemo } from "react";
import { Eye, MapPin, Calendar, Clock, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialogs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reservation, useReservation } from "@/hooks/reservations";

// Define the booking type interface
interface Booking {
  id: string;
  user: string;
  driver: string;
  origin: string;
  destination: string;
  originCoords: [number, number];
  destinationCoords: [number, number];
  date: string;
  time: string;
  status: string;
  price: string;
  paymentStatus: string;
}

// Dynamic import of BookingMap to avoid SSR issues with Leaflet
const BookingMap = dynamic(() => import("@/components/BookingMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 dark:bg-neutral-700 rounded-lg animate-pulse" />
  ),
});

export default function BookingsPage() {
  const [bookings, setBookings] = useState<reservation[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<reservation | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getReservations, update } = useReservation();
  const fetchData = async () => {
    try {
      const response = await getReservations();
      setBookings(response.reservations);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  // Estados para los filtros
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [passenger, setPassenger] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // Estado para las reservas filtradas
  const [filteredBookings, setFilteredBookings] = useState<reservation[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  // useEffect para aplicar los filtros
  useEffect(() => {
    const filtered = bookings?.filter((booking) => {
      const isWithinDateRange =
        !dateFrom || new Date(booking.date_start) >= new Date(dateFrom);
      const matchesPassenger =
        !passenger ||
        booking.name.toLowerCase().includes(passenger.toLowerCase());
      const matchesStatus =
        !status ||
        status === "todos" ||
        booking.status.toLowerCase() === status.toLowerCase();

      return isWithinDateRange && matchesPassenger && matchesStatus;
    });

    setFilteredBookings(filtered);
  }, [dateFrom, dateTo, passenger, status, bookings]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Reservas
      </h1>
      {/* Componente de Filtrado para reservas */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div>
            <Label htmlFor="dateRange">Rango de Fechas</Label>
            <div className="flex gap-2">
              <Input
                type="date"
                id="dateFrom"
                className="flex-1"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="passenger">Pasajero</Label>
            <Input
              id="passenger"
              placeholder="Nombre del pasajero"
              value={passenger}
              onChange={(e) => setPassenger(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="complete">Completado</SelectItem>
                <SelectItem value="accept">En progreso</SelectItem>
                <SelectItem value="waiting">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 w-full justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setDateFrom("");
              setDateTo("");
              setPassenger("");
              setStatus("todos");
            }}
          >
            Limpiar
          </Button>
          <Button
            onClick={() => {
              // La lógica de filtrado ya está en el useEffect
            }}
          >
            Aplicar
          </Button>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Codigo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Chofer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300"
                  >
                    No se encontraron resultados que coincidan con los
                    parámetros de búsqueda.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 dark:hover:bg-neutral-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {booking.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {booking.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {booking.driver["name"]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {booking.date_start} {booking.time_start}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={booking.status}
                        onValueChange={async (newStatus) => {
                          const formData = new FormData();
                          formData.append("status", newStatus);
                          formData.append("code", booking.code);
                          formData.append("name", booking.name);
                          formData.append("date_start", booking.date_start);
                          formData.append("time_start", booking.time_start);
                          formData.append("driver_id", booking.driver.id);
                          console.log(formData.get("status"));
                          await update(booking.id, formData);
                          // Actualiza el estado localmente
                          const updatedBookings = filteredBookings.map((b) =>
                            b.id === booking.id
                              ? { ...b, status: newStatus }
                              : b
                          );
                          setFilteredBookings(updatedBookings); // Asegúrate de tener setFilteredBookings disponible
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={booking.status} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="complete">Completado</SelectItem>
                          <SelectItem value="accept">En progreso</SelectItem>
                          <SelectItem value="waiting">Pendiente</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalles
                          </Button>
                        </DialogTrigger>
                        {selectedBooking && (
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>
                                Detalles de la Reserva #{selectedBooking.id}
                              </DialogTitle>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-4"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </DialogHeader>

                            <div className="grid gap-6 py-4">
                              <div className="grid gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <User className="w-4 h-4" />
                                  <span className="font-medium">Usuario:</span>
                                  {selectedBooking.name}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <User className="w-4 h-4" />
                                  <span className="font-medium">Chofer:</span>
                                  {selectedBooking.driver["name"]}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4" />
                                  <span className="font-medium">Fecha:</span>
                                  {selectedBooking.date_start}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="w-4 h-4" />
                                  <span className="font-medium">Hora:</span>
                                  {selectedBooking.time_start}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="font-medium">Estado:</span>
                                  <span>{selectedBooking.status}</span>
                                </div>
                              </div>{" "}
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold">
                                  Ubicaciones
                                </h3>
                                <BookingMap
                                  originCoords={[
                                    Number(
                                      selectedBooking.stations[0].latitude
                                    ),
                                    Number(
                                      selectedBooking.stations[0].longitude
                                    ),
                                  ]}
                                  destinationCoords={[
                                    Number(
                                      selectedBooking.stations[
                                        selectedBooking.stations.length - 1
                                      ].latitude
                                    ),
                                    Number(
                                      selectedBooking.stations[
                                        selectedBooking.stations.length - 1
                                      ].longitude
                                    ),
                                  ]}
                                  originName={
                                    selectedBooking.stations[0].address
                                  }
                                  destinationName={
                                    selectedBooking.stations[
                                      selectedBooking.stations.length - 1
                                    ].address
                                  }
                                />
                                <div className="grid gap-2 mt-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-green-500" />
                                    <span className="font-medium">Origen:</span>
                                    {selectedBooking.stations[0].address},{" "}
                                    {selectedBooking.stations[0].city},{" "}
                                    {selectedBooking.stations[0].country}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-red-500" />
                                    <span className="font-medium">
                                      Destino:
                                    </span>
                                    {
                                      selectedBooking.stations[
                                        selectedBooking.stations.length - 1
                                      ].address
                                    }
                                    ,{" "}
                                    {
                                      selectedBooking.stations[
                                        selectedBooking.stations.length - 1
                                      ].city
                                    }
                                    ,{" "}
                                    {
                                      selectedBooking.stations[
                                        selectedBooking.stations.length - 1
                                      ].country
                                    }
                                  </div>
                                </div>
                              </div>
                              <Button
                                onClick={() => {
                                  if (
                                    selectedBooking.stations[0].latitude && [
                                      Number(
                                        selectedBooking.stations[
                                          selectedBooking.stations.length - 1
                                        ].latitude
                                      ),
                                      Number(
                                        selectedBooking.stations[
                                          selectedBooking.stations.length - 1
                                        ].longitude
                                      ),
                                    ]
                                  ) {
                                    const origin = [
                                      Number(
                                        selectedBooking.stations[0].latitude
                                      ),
                                      Number(
                                        selectedBooking.stations[0].longitude
                                      ),
                                    ].join(",");
                                    const destination = [
                                      Number(
                                        selectedBooking.stations[
                                          selectedBooking.stations.length - 1
                                        ].latitude
                                      ),
                                      Number(
                                        selectedBooking.stations[
                                          selectedBooking.stations.length - 1
                                        ].longitude
                                      ),
                                    ].join(",");
                                    window.open(
                                      `https://www.google.com/maps/dir/${origin}/${destination}`,
                                      "_blank"
                                    );
                                  } else {
                                    console.error("Coordenadas no válidas");
                                    alert(
                                      "Las coordenadas de origen o destino no están definidas."
                                    );
                                  }
                                }}
                                className="w-full mt-4"
                              >
                                <MapPin className="w-4 h-4 mr-2" />
                                Abrir en Google Maps
                              </Button>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
