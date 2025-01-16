'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, MapPin, Calendar, User, X, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TravelPost {
    id: number
    title: string
    description: string
    location: string
    date: string
    driver: string
    images: string[]
    rating: number
    fullDescription: string
    highlights: string[]
}

export default function TravelPosts() {
    const { t } = useTranslation()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedPost, setSelectedPost] = useState<TravelPost | null>(null)
    const [modalImageIndex, setModalImageIndex] = useState(0)

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
        skipSnaps: false,
    })

    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    })

    const [emblaModalRef, emblaModalApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
    })

    const scrollPrev = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollPrev()
    }, [emblaMainApi])

    const scrollNext = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollNext()
    }, [emblaMainApi])

    const scrollModalPrev = useCallback(() => {
        if (emblaModalApi) emblaModalApi.scrollPrev()
    }, [emblaModalApi])

    const scrollModalNext = useCallback(() => {
        if (emblaModalApi) emblaModalApi.scrollNext()
    }, [emblaModalApi])

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    const posts: TravelPost[] = [
        {
            id: 1,
            title: 'Amazing Journey through São Paulo',
            description: 'A wonderful experience exploring the vibrant city of São Paulo',
            fullDescription: 'Join us on an unforgettable journey through the heart of São Paulo, Brazil\'s largest city. From the iconic Paulista Avenue to the cultural richness of the Japanese neighborhood of Liberdade, this trip was filled with amazing discoveries and authentic experiences. Our journey included stops at the famous Municipal Market, the stunning São Paulo Cathedral, and the modern Museum of Art.',
            location: 'São Paulo, Brazil',
            date: '2023-05-15',
            driver: 'Carlos Rodriguez',
            rating: 4.8,
            highlights: [
                'Visit to the Municipal Market',
                'Tour of Paulista Avenue',
                'Exploration of Liberdade',
                'Museum of Art experience'
            ],
            images: [
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
            ],
        },
        {
            id: 2,
            title: 'Discovering Rio de Janeiro',
            description: 'An exciting adventure in the Marvelous City',
            fullDescription: 'Experience the magic of Rio de Janeiro through our lens. This journey took us from the famous beaches of Copacabana and Ipanema to the iconic Christ the Redeemer statue. We explored the colorful Selaron Steps, took a cable car ride to Sugar Loaf Mountain, and enjoyed the vibrant nightlife of Lapa.',
            location: 'Rio de Janeiro, Brazil',
            date: '2023-06-02',
            driver: 'Maria Silva',
            rating: 4.9,
            highlights: [
                'Visit to Christ the Redeemer',
                'Sugar Loaf Mountain tour',
                'Beach day at Copacabana',
                'Selaron Steps exploration'
            ],
            images: [
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
            ],
        },
        {
            id: 3,
            title: 'Buenos Aires Adventure',
            description: 'Exploring the Paris of South America',
            fullDescription: 'Immerse yourself in the passionate culture of Buenos Aires. Our journey through Argentina\'s capital was filled with tango shows, historic neighborhoods, and culinary delights. From the colorful houses of La Boca to the sophisticated Recoleta district, every moment was a new discovery.',
            location: 'Buenos Aires, Argentina',
            date: '2023-06-20',
            driver: 'Juan Gomez',
            rating: 4.7,
            highlights: [
                'Tango show in San Telmo',
                'La Boca neighborhood tour',
                'Recoleta Cemetery visit',
                'Traditional asado experience'
            ],
            images: [
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
                '/placeholder.svg?height=600&width=800',
            ],
        },
    ]

    return (
        <div className="bg-gray-100/50 rounded-3xl py-16 max-h-screen overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className=""
                >
                    <h2 className="text-3xl font-bold text-center text-[#272727] mb-1">
                        {t('travelPosts.intro')}
                    </h2>
                </motion.div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaMainRef}>
                        <div className="flex">
                            {posts.map((post, index) => (
                                <div key={post.id} className="flex-[0_0_100%] min-w-0 pl-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg"
                                    >
                                        <div className="relative h-72">
                                            <Image
                                                src={post.images[0] || "/placeholder.svg"}
                                                alt={post.title}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span className="text-sm">{post.location}</span>
                                            </div>
                                            <p className="text-gray-700 mb-3 text-sm line-clamp-2">{post.description}</p>
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <div className="flex items-center">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    <span>{post.date}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <User className="w-3 h-3 mr-1" />
                                                    <span>Driver: {post.driver}</span>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setSelectedPost(post)}
                                                className="mt-3 w-full bg-[#6944ff] text-white py-2 rounded-xl font-medium hover:bg-[#5933ff] transition-colors text-sm"
                                            >
                                                Read More
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={scrollPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-2">
                    <h3 className="text-2xl font-bold mb-8">More Amazing Journeys</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className="relative h-36">
                                    <Image
                                        src={post.images[0] || "/placeholder.svg"}
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-3">
                                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                                    <h4 className="font-semibold text-lg line-clamp-2 group-hover:text-[#6944ff] transition-colors">
                                        {post.title}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-6" ref={emblaThumbsRef}>
                    <div className="flex">
                        {posts.map((post, index) => (
                            <div
                                key={post.id}
                                className={`flex-[0_0_33.33%] min-w-0 pl-4 ${index === selectedIndex ? 'opacity-100' : 'opacity-50'
                                    }`}
                            >
                                <button
                                    onClick={() => onThumbClick(index)}
                                    className="w-full focus:outline-none"
                                >
                                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                        <Image
                                            src={post.images[0] || "/placeholder.svg"}
                                            alt={post.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setSelectedPost(null)
                            }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className="relative max-w-6xl mx-auto my-8 bg-white rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute right-4 top-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative h-[60vh]" ref={emblaModalRef}>
                                <div className="flex h-full">
                                    {selectedPost.images.map((image, index) => (
                                        <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                                            <Image
                                                src={image || "/placeholder.svg"}
                                                alt={`${selectedPost.title} - Image ${index + 1}`}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={scrollModalPrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={scrollModalNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold">{selectedPost.title}</h2>
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                        <span className="ml-1 font-semibold">{selectedPost.rating}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2">
                                        <div className="prose max-w-none">
                                            <p className="text-gray-700 mb-6">{selectedPost.fullDescription}</p>
                                            <h3 className="text-xl font-semibold mb-4">Trip Highlights</h3>
                                            <ul className="space-y-2">
                                                {selectedPost.highlights.map((highlight, index) => (
                                                    <li key={index} className="flex items-center text-gray-700">
                                                        <span className="w-2 h-2 bg-[#6944ff] rounded-full mr-2" />
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-gray-50 rounded-xl p-6">
                                            <h3 className="text-lg font-semibold mb-4">Trip Details</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center text-gray-600">
                                                    <MapPin className="w-5 h-5 mr-3" />
                                                    <span>{selectedPost.location}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Calendar className="w-5 h-5 mr-3" />
                                                    <span>{selectedPost.date}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <User className="w-5 h-5 mr-3" />
                                                    <span>{selectedPost.driver}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            {selectedPost.images.slice(0, 6).map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                                                    onClick={() => {
                                                        setModalImageIndex(index)
                                                        if (emblaModalApi) emblaModalApi.scrollTo(index)
                                                    }}
                                                >
                                                    <Image
                                                        src={image || "/placeholder.svg"}
                                                        alt={`${selectedPost.title} - Thumbnail ${index + 1}`}
                                                        width={100}
                                                        height={100}
                                                        layout="responsive"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

