"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { reservation, useReservation } from "@/hooks/reservations";
import { useAuth } from "@/hooks/auth";

export default function MyReservations() {
  const { user } = useAuth();
  const { getReservationsUser, getReservations } = useReservation();
  const [reservations, setReservations] = useState<reservation[]>([]);
  const fetchReservations = async () => {
    try {
      const response = await getReservationsUser(user.id);
      setReservations(response.reservations);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);
  const [selectedReservation, setSelectedReservation] =
    useState<reservation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleStatusChange = (
    reservationId: string,
    newStatus: reservation["status"]
  ) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, status: newStatus }
          : reservation
      )
    );
  };

  const getStatusColor = (status: reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Reservas</h1>
      <div className="grid gap-6">
        {reservations.map((reservation) => (
          <motion.div
            key={reservation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span>{reservation.date_start}</span>
                <Clock className="w-5 h-5 ml-4 mr-2 text-gray-500" />
                <span>{reservation.time_start}</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  reservation.status
                )}`}
              >
                {reservation.status}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                <span>
                  {reservation.stations[0].address} →{" "}
                  {
                    reservation.stations[reservation.stations.length - 1]
                      .address
                  }
                </span>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedReservation(reservation);
                    setIsDialogOpen(true);
                  }}
                >
                  Ver detalles
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="absolute right-4 top-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col items-center pt-6 pb-4">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-gray-600" />
                  </div>
                  <DialogTitle>Detalles de la Reserva</DialogTitle>
                  <p className="text-sm text-gray-500">
                    Reserva #{reservation.id}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Estado:</span>
                      <span className="font-medium"> {reservation.status}</span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Precio:</span>
                      <span className="font-medium">{reservation.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        Estado del pago:
                      </span>
                      <span className="font-medium">
                        {reservation.paymentStatus}
                      </span>
                    </div> */}
                  </div>
                </div>

                <Collapsible
                  open={isGuideOpen}
                  onOpenChange={setIsGuideOpen}
                  className="w-full"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4">
                    <span>Información adicional</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isGuideOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 px-4 py-3">
                    <div>
                      <h3 className="font-medium mb-2">Chofer asignado</h3>
                      <p className="text-sm text-gray-600">
                        {reservation.driver.name}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Ruta</h3>
                      <p className="text-sm text-gray-600">
                        {reservation.stations[0].address} →{" "}
                        {
                          reservation.stations[reservation.stations.length - 1]
                            .address
                        }
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="flex justify-between gap-4 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${reservation.driver.phone_number}`,
                        "_blank"
                      )
                    }
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contactar por WhatsApp
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleStatusChange(reservation.id, "cancelled");
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancelar Reserva
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
