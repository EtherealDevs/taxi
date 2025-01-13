'use client'

import { motion } from 'framer-motion'
import { Camera, CreditCard, Car, MapPin } from 'lucide-react'

export default function HowItWorks() {
    const steps = [
        {
            icon: <Camera className="w-8 h-8 text-[#6944ff]" />,
            title: "Reserva del Viaje",
            description: "Viajes internacionales al precio ideal. Ofreciendo viajes Seguros desde 2004"
        },
        {
            icon: <CreditCard className="w-8 h-8 text-[#6944ff]" />,
            title: "Cotización",
            description: "Viajes internacionales al precio ideal. Ofreciendo viajes Seguros desde 2004"
        },
        {
            icon: <MapPin className="w-8 h-8 text-[#6944ff]" />,
            title: "Pago",
            description: "Viajes internacionales al precio ideal. Ofreciendo viajes Seguros desde 2004"
        },
        {
            icon: <Car className="w-8 h-8 text-[#6944ff]" />,
            title: "Llegada",
            description: "Viajes internacionales al precio ideal. Ofreciendo viajes Seguros desde 2004"
        }
    ]

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl font-bold mb-4">¿Cómo Funcionan las reservas?</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-[#ececec] rounded-2xl p-6"
                        >
                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-center mb-2">{step.title}</h3>
                            <p className="text-sm text-[#272727] text-center">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

