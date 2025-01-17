'use client'

import { useState } from 'react'
import { Eye, MapPin, Calendar, Clock, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Define the booking type interface
interface Booking {
    id: string
    user: string
    driver: string
    origin: string
    destination: string
    originCoords: [number, number]
    destinationCoords: [number, number]
    date: string
    time: string
    status: string
    price: string
    paymentStatus: string
}

// Dynamic import of BookingMap to avoid SSR issues with Leaflet
const BookingMap = dynamic(() => import('@/components/BookingMap'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-100 dark:bg-neutral-700 rounded-lg animate-pulse" />
})


export default function BookingsPage() {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [filters, setFilters] = useState({
        passenger: '',
        date: '',
        status: '',
        secureCode: '',
        reservationId: '',
    })

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const applyFilters = () => {
        // Here you would typically call an API or filter the data
        console.log('Applying filters:', filters)
    }

    const bookings: Booking[] = [
        {
            id: '1234',
            user: 'Ana Martínez',
            driver: 'Juan Pérez',
            origin: 'Buenos Aires, Argentina',
            destination: 'Montevideo, Uruguay',
            originCoords: [-34.6037, -58.3816],
            destinationCoords: [-34.9011, -56.1645],
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
            originCoords: [-33.4489, -70.6693],
            destinationCoords: [-32.8908, -68.8272],
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
            originCoords: [-12.0464, -77.0428],
            destinationCoords: [-13.5319, -71.9675],
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
                            />
                            <Input
                                type="date"
                                id="dateTo"
                                className="flex-1"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="passenger">Pasajero</Label>
                        <Input
                            id="passenger"
                            placeholder="Nombre del pasajero"
                        />
                    </div>
                    <div>
                        <Label htmlFor="status">Estado</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="completado">Completado</SelectItem>
                                <SelectItem value="en-progreso">En progreso</SelectItem>
                                <SelectItem value="pendiente">Pendiente</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex gap-2 w-full justify-end">
                    <Button variant="outline">Limpiar</Button>
                    <Button>Aplicar</Button>
                </div>
            </div>
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{booking.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.user}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.driver}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {booking.date} {booking.time}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'Completado'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : booking.status === 'En progreso'
                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => {
                                                    setSelectedBooking(booking)
                                                    setIsDialogOpen(true)
                                                }}>
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
                                                                {selectedBooking.user}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <User className="w-4 h-4" />
                                                                <span className="font-medium">Chofer:</span>
                                                                {selectedBooking.driver}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Calendar className="w-4 h-4" />
                                                                <span className="font-medium">Fecha:</span>
                                                                {selectedBooking.date}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Clock className="w-4 h-4" />
                                                                <span className="font-medium">Hora:</span>
                                                                {selectedBooking.time}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h3 className="text-lg font-semibold">Ubicaciones</h3>
                                                            <BookingMap
                                                                originCoords={selectedBooking.originCoords}
                                                                destinationCoords={selectedBooking.destinationCoords}
                                                                originName={selectedBooking.origin}
                                                                destinationName={selectedBooking.destination}
                                                            />
                                                            <div className="grid gap-2 mt-2">
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <MapPin className="w-4 h-4 text-green-500" />
                                                                    <span className="font-medium">Origen:</span>
                                                                    {selectedBooking.origin}
                                                                </div>
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <MapPin className="w-4 h-4 text-red-500" />
                                                                    <span className="font-medium">Destino:</span>
                                                                    {selectedBooking.destination}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            onClick={() => {
                                                                if (
                                                                    selectedBooking?.originCoords &&
                                                                    selectedBooking?.destinationCoords
                                                                ) {
                                                                    const origin = selectedBooking.originCoords.join(',');
                                                                    const destination = selectedBooking.destinationCoords.join(',');
                                                                    window.open(
                                                                        `https://www.google.com/maps/dir/${origin}/${destination}`,
                                                                        '_blank'
                                                                    );
                                                                } else {
                                                                    console.error('Coordenadas no válidas');
                                                                    alert('Las coordenadas de origen o destino no están definidas.');
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

