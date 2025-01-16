'use client'

import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function TravelPosts() {
    const { t } = useTranslation()
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
        slidesToScroll: 1,
        skipSnaps: false,
        startIndex: 1
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    // Auto-scroll functionality
    useEffect(() => {
        if (!emblaApi) return

        let timeoutId: NodeJS.Timeout

        const autoScroll = () => {
            emblaApi.scrollNext()
            timeoutId = setTimeout(autoScroll, 2000) // Wait 2 seconds before next scroll
        }

        // Start auto-scroll
        timeoutId = setTimeout(autoScroll, 2000)

        // Cleanup on unmount
        return () => {
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [emblaApi])

    const posts = [
        {
            id: 1,
            title: t('travelPosts.saoPaulo.title'),
            description: t('travelPosts.saoPaulo.description'),
            mainImage: "/placeholder.svg?height=400&width=400",
            price: "$150",
            rating: 4.5
        },
        {
            id: 2,
            title: t('travelPosts.rioDeJaneiro.title'),
            description: t('travelPosts.rioDeJaneiro.description'),
            mainImage: "/placeholder.svg?height=400&width=400",
            price: "$200",
            rating: 5
        },
        {
            id: 3,
            title: t('travelPosts.buenosAires.title'),
            description: t('travelPosts.buenosAires.description'),
            mainImage: "/placeholder.svg?height=400&width=400",
            price: "$180",
            rating: 4.8
        },
        {
            id: 4,
            title: t('travelPosts.machuPicchu.title'),
            description: t('travelPosts.machuPicchu.description'),
            mainImage: "/placeholder.svg?height=400&width=400",
            price: "$250",
            rating: 4.7
        },
        {
            id: 5,
            title: t('travelPosts.cartagena.title'),
            description: t('travelPosts.cartagena.description'),
            mainImage: "/placeholder.svg?height=400&width=400",
            price: "$170",
            rating: 4.6
        }
    ]

    return (
        <div className="bg-gray-100/50 rounded-3xl py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold text-center text-[#272727] mb-12">
                        {t('travelPosts.intro')}
                    </h2>
                </motion.div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {posts.map((post, index) => (
                                <div key={post.id} className="flex-[0_0_33.33%] min-w-0 px-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="relative bg-[#98FB98] rounded-2xl overflow-hidden p-6 transition-all duration-300 embla-slide"
                                    >
                                        <div className="relative">
                                            <Image
                                                src={post.mainImage || "/placeholder.svg"}
                                                alt={post.title}
                                                width={400}
                                                height={400}
                                                className="w-full h-48 object-cover rounded-lg mb-4"
                                            />
                                            <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                        <p className="text-[#272727] text-sm mb-4 line-clamp-2">{post.description}</p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <span className="text-2xl font-bold">{post.price}</span>
                                                <span className="text-sm line-through text-gray-500 ml-2">$299</span>
                                            </div>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(post.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-gray-100 text-[#272727] py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            Buy Now
                                        </motion.button>
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
            </div>
        </div>
    )
}