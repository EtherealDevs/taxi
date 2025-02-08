"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

// Mock data for testing
const mockPosts = [
    {
        id: 1,
        title: "Viaje a São Paulo",
        description: "Un maravilloso viaje por la ciudad más grande de Brasil",
        images: ["/placeholder.svg?height=400&width=600"],
        created_at: "2024-02-08",
    },
    {
        id: 2,
        title: "Aventura en Rio de Janeiro",
        description: "Explorando las maravillas de la Ciudad Maravillosa",
        images: ["/placeholder.svg?height=400&width=600"],
        created_at: "2024-02-07",
    },
    {
        id: 3,
        title: "Tour por Buenos Aires",
        description: "Descubriendo los secretos de la capital argentina",
        images: ["/placeholder.svg?height=400&width=600"],
        created_at: "2024-02-06",
    },
    {
        id: 4,
        title: "Machu Picchu Express",
        description: "Una experiencia única en las alturas de los Andes",
        images: ["/placeholder.svg?height=400&width=600"],
        created_at: "2024-02-05",
    },
    {
        id: 5,
        title: "Cartagena Colonial",
        description: "Recorriendo las calles históricas de Cartagena",
        images: ["/placeholder.svg?height=400&width=600"],
        created_at: "2024-02-04",
    },
    {
        id: 6,
        title: "Santiago y Viña del Mar",
        description: "Lo mejor de la costa chilena en un solo viaje",
        images: ["/placeholder.svg?height=400&width=600"],
        created_at: "2024-02-03",
    },
]

interface Post {
    id: number
    title: string
    description: string
    images: string[]
    created_at: string
}

export default function OtherPosts() {
    const { t } = useTranslation()
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showAllPosts, setShowAllPosts] = useState(false)

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
        return new Date(date).toLocaleDateString("es-ES", options)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate API call delay
                await new Promise((resolve) => setTimeout(resolve, 1000))
                setPosts(mockPosts)
            } catch (err) {
                setError("No se pudieron cargar los posts. Por favor, intente nuevamente.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const visiblePosts = showAllPosts ? posts : posts.slice(0, 4)

    if (isLoading) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <h3 className="text-2xl font-bold text-gray-700 mb-1">Mis viajes y anuncios</h3>
                <div className="w-24 h-2 bg-blue-500 mt-1 mb-6" />
                <div className="text-center">Cargando posts...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <h3 className="text-2xl font-bold text-gray-700 mb-1">Mis viajes y anuncios</h3>
                <div className="w-24 h-2 bg-blue-500 mt-1 mb-6" />
                <div className="text-center text-red-500">{error}</div>
            </div>
        )
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <h3 className="text-2xl font-bold text-gray-700 mb-1">Mis viajes y anuncios</h3>
            <div className="w-24 h-2 bg-blue-500 mt-1 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {visiblePosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-48">
                            <Image
                                src={post.images[0] || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-500 mb-2">{formatDate(post.created_at)}</p>
                            <h4 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h4>
                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            {posts.length > 4 && (
                <div className="mt-8 text-center">
                    <Button onClick={() => setShowAllPosts(!showAllPosts)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl">
                        {showAllPosts ? "Ver menos" : "Ver más"}
                        <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform duration-300 ${showAllPosts ? "rotate-180" : ""}`}
                        />
                    </Button>
                </div>
            )}
        </div>
    )
}

