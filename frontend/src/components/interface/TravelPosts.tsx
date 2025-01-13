'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function TravelPosts() {
    const { t } = useTranslation();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        dragFree: true,
        containScroll: 'trimSnaps'
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const posts = [
        {
            id: 1,
            title: t('travelPosts.saoPaulo.title'),
            description: t('travelPosts.saoPaulo.description'),
            mainImage: "/placeholder.svg?height=400&width=600",
            gallery: [
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200"
            ]
        },
        {
            id: 2,
            title: t('travelPosts.rioDeJaneiro.title'),
            description: t('travelPosts.rioDeJaneiro.description'),
            mainImage: "/placeholder.svg?height=400&width=600",
            gallery: [
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200"
            ]
        },
        {
            id: 3,
            title: t('travelPosts.buenosAires.title'),
            description: t('travelPosts.buenosAires.description'),
            mainImage: "/placeholder.svg?height=400&width=600",
            gallery: [
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200"
            ]
        },
        {
            id: 4,
            title: t('travelPosts.machuPicchu.title'),
            description: t('travelPosts.machuPicchu.description'),
            mainImage: "/placeholder.svg?height=400&width=600",
            gallery: [
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200"
            ]
        },
        {
            id: 5,
            title: t('travelPosts.cartagena.title'),
            description: t('travelPosts.cartagena.description'),
            mainImage: "/placeholder.svg?height=400&width=600",
            gallery: [
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200",
                "/placeholder.svg?height=200&width=200"
            ]
        }
    ]

    return (
        <div className="bg-[#ececec] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-[#272727]">
                        {t('travelPosts.intro')}
                    </h2>
                </motion.div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {posts.map((post, index) => (
                                <div key={post.id} className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%]">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white rounded-2xl overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-4">{post.title}</h3>
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                <div className="col-span-3">
                                                    <Image
                                                        src={post.mainImage}
                                                        alt={post.title}
                                                        width={600}
                                                        height={400}
                                                        className="rounded-lg w-full h-48 object-cover"
                                                    />
                                                </div>
                                                {post.gallery.map((image, i) => (
                                                    <Image
                                                        key={i}
                                                        src={image}
                                                        alt={`${post.title} gallery ${i + 1}`}
                                                        width={200}
                                                        height={200}
                                                        className="rounded-lg w-full h-24 object-cover"
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-[#272727] text-sm mb-4">{post.description}</p>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full bg-[#6944ff] text-white py-2 rounded-xl font-medium hover:bg-[#5933ff] transition-colors"
                                            >
                                                {t('travelPosts.seeMore')}
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}

