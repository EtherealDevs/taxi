'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Contacto() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-center mb-12"
                >
                    Contacto
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-[#ececec] rounded-xl p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6944ff] focus:border-transparent"
                            />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6944ff] focus:border-transparent"
                            />
                            <textarea
                                placeholder="Mensaje"
                                rows={4}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6944ff] focus:border-transparent"
                            ></textarea>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-[#6944ff] text-white py-3 rounded-xl font-medium hover:bg-[#5933ff] transition-colors"
                            >
                                Enviar mensaje
                            </motion.button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Información de contacto</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <MapPin className="w-6 h-6 text-[#6944ff] mr-4" />
                                    <span>123 Calle Principal, Ciudad, País</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-6 h-6 text-[#6944ff] mr-4" />
                                    <span>+1 234 567 890</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-6 h-6 text-[#6944ff] mr-4" />
                                    <span>info@choferconnect.com</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Horario de atención</h2>
                            <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                            <p>Sábados: 10:00 AM - 2:00 PM</p>
                            <p>Domingos: Cerrado</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

