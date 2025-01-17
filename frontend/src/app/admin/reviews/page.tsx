'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Trash2} from 'lucide-react'
import { format } from 'date-fns'
import Image from 'next/image'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface Review {
    id: string
    userId: string
    userName: string
    userAvatar: string
    rating: number
    message: string
    date: string
    tripId: string
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: '1',
            userId: 'user1',
            userName: 'María González',
            userAvatar: '/placeholder.svg?height=40&width=40',
            rating: 5,
            message: 'Excelente servicio, muy puntual y profesional. El vehículo estaba impecable.',
            date: '2024-01-15',
            tripId: 'trip1'
        },
        {
            id: '2',
            userId: 'user2',
            userName: 'Carlos Rodríguez',
            userAvatar: '/placeholder.svg?height=40&width=40',
            rating: 4,
            message: 'Buen servicio en general, aunque hubo un pequeño retraso en la recogida.',
            date: '2024-01-14',
            tripId: 'trip2'
        },
        {
            id: '3',
            userId: 'user3',
            userName: 'Ana Martínez',
            userAvatar: '/placeholder.svg?height=40&width=40',
            rating: 5,
            message: 'Increíble experiencia, muy recomendado para viajes largos.',
            date: '2024-01-13',
            tripId: 'trip3'
        }
    ])

    const [selectedReview, setSelectedReview] = useState<Review | null>(null)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const handleDelete = (review: Review) => {
        setSelectedReview(review)
        setShowDeleteDialog(true)
    }

    const confirmDelete = () => {
        if (selectedReview) {
            setReviews(reviews.filter(review => review.id !== selectedReview.id))
            setShowDeleteDialog(false)
            setSelectedReview(null)
        }
    }

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
            />
        ))
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Reseñas de Pasajeros</h1>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Usuario</TableHead>
                            <TableHead className="w-[120px]">Calificación</TableHead>
                            <TableHead>Reseña</TableHead>
                            <TableHead className="w-[120px]">Fecha</TableHead>
                            <TableHead className="w-[100px] text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.map((review) => (
                            <motion.tr
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="group hover:bg-gray-50"
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={review.userAvatar || "/placeholder.svg"}
                                            alt={review.userName}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <p className="font-medium">{review.userName}</p>
                                            <p className="text-sm text-gray-500">ID: {review.userId}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        {renderStars(review.rating)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="line-clamp-2">{review.message}</p>
                                </TableCell>
                                <TableCell>
                                    {format(new Date(review.date), 'dd/MM/yyyy')}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(review)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar esta reseña?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. La reseña será eliminada permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

