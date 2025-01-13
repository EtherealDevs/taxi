'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
    const stats = [
        { value: '100%', label: 'Seguridad' },
        { value: '+200', label: 'Viajes' },
        { value: '4.5', label: 'Calidad' },
        { value: '5 Años', label: 'Experiencia' }
    ]

    return (
        <div className="bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            Somos Chofer Connect
                        </h1>
                        <p className="text-lg text-[#272727] mb-8">
                            Viajes internacionales al precio ideal.
                            <br />
                            Ofreciendo viajes Seguros desde 2004
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm p-4 text-center"
                                >
                                    <div className="text-xl font-bold text-[#6944ff]">{stat.value}</div>
                                    <div className="text-sm text-[#272727]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <Image
                            src="/placeholder.svg?height=300&width=300"
                            alt="Chofer profesional"
                            width={300}
                            height={300}
                            className="rounded-2xl w-full h-full object-cover"
                        />
                        <Image
                            src="/placeholder.svg?height=300&width=300"
                            alt="Auto de lujo"
                            width={300}
                            height={300}
                            className="rounded-2xl w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

