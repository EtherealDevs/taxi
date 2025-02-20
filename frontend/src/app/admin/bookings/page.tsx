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
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Reservas
      </h1>
      {/* Componente de Filtrado para reservas */}
      <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Filtros
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="dateFrom">Fecha desde</Label>
            <Input
              type="date"
              id="dateFrom"
              className="w-full"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="passenger">Pasajero</Label>
            <Input
              id="passenger"
              placeholder="Nombre del pasajero"
              className="w-full"
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

        <div className="flex flex-wrap gap-2 mt-4 justify-end">
          <Button
            variant="outline"
            className="px-3 py-1 text-xs md:text-sm"
            onClick={() => {
              setDateFrom("");
              setPassenger("");
              setStatus("todos");
            }}
          >
            Limpiar
          </Button>
          <Button className="px-3 py-1 text-xs md:text-sm">Aplicar</Button>
        </div>
      </div>
      <table className="hidden md:table min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-neutral-700">
          <tr>
            {["Código", "Usuario", "Chofer", "Fecha", "Estado", "Acciones"].map(
              (header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredBookings.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300"
              >
                No se encontraron resultados.
              </td>
            </tr>
          ) : (
            filteredBookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  {booking.code}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">
                  {booking.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">
                  {booking.driver["name"]}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">
                  {booking.date_start} {booking.time_start}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Select
                    value={booking.status}
                    onValueChange={async (newStatus) => {
                      const formData = new FormData();
                      formData.append("status", newStatus);
                      formData.append("code", booking.code);
                      await update(booking.id, formData);
                      setFilteredBookings((prev) =>
                        prev.map((b) =>
                          b.id === booking.id ? { ...b, status: newStatus } : b
                        )
                      );
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
                <td className="px-4 py-3 text-sm font-medium">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                Number(selectedBooking.stations[0].latitude),
                                Number(selectedBooking.stations[0].longitude),
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
                              originName={selectedBooking.stations[0].address}
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
                                <span className="font-medium">Destino:</span>
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
                                  Number(selectedBooking.stations[0].latitude),
                                  Number(selectedBooking.stations[0].longitude),
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
      {/* Vista tipo tarjetas en móviles */}
      <div className="md:hidden space-y-4 p-4">
        {filteredBookings.length === 0 ? (
          <p className="text-center text-sm text-gray-500 dark:text-gray-300">
            No se encontraron resultados.
          </p>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg shadow-md"
            >
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Código: {booking.code}
                </h3>
                <Select
                  value={booking.status}
                  onValueChange={async (newStatus) => {
                    const formData = new FormData();
                    formData.append("status", newStatus);
                    formData.append("code", booking.code);
                    await update(booking.id, formData);
                    setFilteredBookings((prev) =>
                      prev.map((b) =>
                        b.id === booking.id ? { ...b, status: newStatus } : b
                      )
                    );
                  }}
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder={booking.status} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="complete">Completado</SelectItem>
                    <SelectItem value="accept">En progreso</SelectItem>
                    <SelectItem value="waiting">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Usuario: {booking.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Chofer: {booking.driver["name"]}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Fecha: {booking.date_start} {booking.time_start}
              </p>
              <div className="mt-3 flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                          <h3 className="text-lg font-semibold">Ubicaciones</h3>
                          <BookingMap
                            originCoords={[
                              Number(selectedBooking.stations[0].latitude),
                              Number(selectedBooking.stations[0].longitude),
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
                            originName={selectedBooking.stations[0].address}
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
                              <span className="font-medium">Destino:</span>
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
                                Number(selectedBooking.stations[0].latitude),
                                Number(selectedBooking.stations[0].longitude),
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
