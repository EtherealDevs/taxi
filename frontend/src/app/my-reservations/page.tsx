'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Phone, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Reservation {
    id: string;
    date: string;
    time: string;
    origin: string;
    destination: string;
    status: 'confirmed' | 'in progress' | 'completed' | 'cancelled';
    driverName: string;
    driverPhone: string;
    price: string;
    paymentStatus: 'pending' | 'completed';
}

export default function MyReservations() {
    const [reservations, setReservations] = useState<Reservation[]>([
        {
            id: '1',
            date: '2023-05-20',
            time: '14:00',
            origin: 'Buenos Aires',
            destination: 'Montevideo',
            status: 'confirmed',
            driverName: 'Juan Pérez',
            driverPhone: '+598 99 123 456',
            price: '$150',
            paymentStatus: 'pending',
        },
        {
            id: '2',
            date: '2023-05-25',
            time: '10:00',
            origin: 'Montevideo',
            destination: 'Punta del Este',
            status: 'in progress',
            driverName: 'María González',
            driverPhone: '+598 99 789 012',
            price: '$80',
            paymentStatus: 'completed',
        },
    ])

    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isGuideOpen, setIsGuideOpen] = useState(false)

    const handleStatusChange = (reservationId: string, newStatus: Reservation['status']) => {
        setReservations(reservations.map(reservation =>
            reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
        ))
    }

    const getStatusColor = (status: Reservation['status']) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800'
            case 'in progress': return 'bg-blue-100 text-blue-800'
            case 'completed': return 'bg-gray-100 text-gray-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
        }
    }

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
                                <span>{reservation.date}</span>
                                <Clock className="w-5 h-5 ml-4 mr-2 text-gray-500" />
                                <span>{reservation.time}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(reservation.status)}`}>
                                {reservation.status}
                            </span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                                <span>{reservation.origin} → {reservation.destination}</span>
                            </div>
                        </div>
                        <Dialog>
                            {isDialogOpen && selectedReservation?.id === reservation.id && (
                                <DialogContent>
                                    <div className="absolute right-4 top-4 ">
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
                                        <DialogTitle>
                                            <p className="text-xl font-semibold mb-2">
                                                Detalles de la Reserva
                                            </p>
                                        </DialogTitle>
                                        <p className="text-sm text-gray-500">
                                            Reserva #{reservation.id}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Estado:</span>
                                                <Select
                                                    defaultValue={reservation.status}
                                                    onValueChange={(value) => handleStatusChange(reservation.id, value as Reservation['status'])}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="confirmed">Confirmado</SelectItem>
                                                        <SelectItem value="in progress">En progreso</SelectItem>
                                                        <SelectItem value="completed">Completado</SelectItem>
                                                        <SelectItem value="cancelled">Cancelado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Precio:</span>
                                                <span className="font-medium">{reservation.price}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Estado del pago:</span>
                                                <span className="font-medium">{reservation.paymentStatus}</span>
                                            </div>
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
                                                className={`h-4 w-4 transition-transform ${isGuideOpen ? "transform rotate-180" : ""
                                                    }`}
                                            />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent className="space-y-4 px-4 py-3">
                                            <div>
                                                <h3 className="font-medium mb-2">Chofer asignado</h3>
                                                <p className="text-sm text-gray-600">{reservation.driverName}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-medium mb-2">Ruta</h3>
                                                <p className="text-sm text-gray-600">
                                                    {reservation.origin} → {reservation.destination}
                                                </p>
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>

                                    <div className="flex justify-between gap-4 mt-6">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => window.open(`https://wa.me/${reservation.driverPhone}`, '_blank')}
                                        >
                                            <Phone className="w-4 h-4 mr-2" />
                                            Contactar por WhatsApp
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            onClick={() => {
                                                handleStatusChange(reservation.id, 'cancelled')
                                                setIsDialogOpen(false)
                                            }}
                                        >
                                            Cancelar Reserva
                                        </Button>
                                    </div>
                                </DialogContent>
                            )}
                        </Dialog>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

