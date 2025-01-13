'use client'

import { useState } from 'react'
import { Eye, MapPin, Calendar, Clock, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// Define the booking type interface
interface Booking {
    id: string
    user: string
    driver: string
    origin: string
    destination: string
    date: string
    time: string
    status: string
    price: string
    paymentStatus: string
}

export default function BookingsPage() {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const bookings: Booking[] = [
        {
            id: '1234',
            user: 'Ana Martínez',
            driver: 'Juan Pérez',
            origin: 'Buenos Aires, Argentina',
            destination: 'Montevideo, Uruguay',
            date: '2023-05-15',
            time: '09:00',
            status: 'Completado',
            price: '$150',
            paymentStatus: 'Pagado'
        },
        {
            id: '5678',
            user: 'Luis Hernández',
            driver: 'María García',
            origin: 'Santiago, Chile',
            destination: 'Mendoza, Argentina',
            date: '2023-05-16',
            time: '14:30',
            status: 'En progreso',
            price: '$200',
            paymentStatus: 'Pendiente'
        },
        {
            id: '9012',
            user: 'Elena Rodríguez',
            driver: 'Carlos Rodríguez',
            origin: 'Lima, Perú',
            destination: 'Cusco, Perú',
            date: '2023-05-17',
            time: '08:00',
            status: 'Pendiente',
            price: '$180',
            paymentStatus: 'Pendiente'
        }
    ]

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Reservas</h1>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-neutral-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Usuario</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Chofer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {bookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="hover:bg-gray-50 dark:hover:bg-neutral-700"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {booking.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {booking.user}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {booking.driver}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {booking.date} {booking.time}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${booking.status === 'Completado'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : booking.status === 'En progreso'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {booking.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {/*
                                          El componente Dialog maneja la apertura del modal
                                          y, al hacer click en Ver detalles, 
                                          seteamos la reserva seleccionada y abrimos el modal.
                                        */}
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedBooking(booking)
                                                        setIsDialogOpen(true)
                                                    }}
                                                >
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Ver detalles
                                                </Button>
                                            </DialogTrigger>

                                            {selectedBooking && (
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Detalles de la Reserva #{selectedBooking.id}
                                                        </DialogTitle>

                                                        {/*
                                                        Aquí tienes el botón que cierra el modal
                                                        con el ícono X de lucide-react.
                                                        */}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-4 top-4"
                                                            onClick={() => setIsDialogOpen(false)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </DialogHeader>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                                Información del Viaje
                                                            </h4>
                                                            <div className="space-y-2">
                                                                <div className="flex items-center">
                                                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                                    <span className="text-sm">
                                                                        Origen: {selectedBooking.origin}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                                    <span className="text-sm">
                                                                        Destino: {selectedBooking.destination}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                                                    <span className="text-sm">
                                                                        Fecha: {selectedBooking.date}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                                                    <span className="text-sm">
                                                                        Hora: {selectedBooking.time}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                                Información del Usuario
                                                            </h4>
                                                            <div className="flex items-center">
                                                                <User className="w-4 h-4 mr-2 text-gray-400" />
                                                                <span className="text-sm">
                                                                    {selectedBooking.user}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                                Información de Pago
                                                            </h4>
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm">Precio:</span>
                                                                    <span className="text-sm font-medium">
                                                                        {selectedBooking.price}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm">Estado del pago:</span>
                                                                    <span
                                                                        className={`text-sm font-medium ${selectedBooking.paymentStatus === 'Pagado'
                                                                            ? 'text-green-600 dark:text-green-400'
                                                                            : 'text-yellow-600 dark:text-yellow-400'
                                                                            }`}
                                                                    >
                                                                        {selectedBooking.paymentStatus}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            )}
                                        </Dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

