'use client'

import FormReserv from "../Reserv"
import Image from "next/image"

export default function Hero() {
    return (
        <div className="w-full min-h-screen bg-white p-4 md:p-8 flex items-center">
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
                {/* Columna Izquierda */}
                <div className="flex-1 space-y-6 p-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Jorge Gomez</h1>
                        <p className="text-gray-600">Viajes Internacionales al precio Ideal.</p>
                        <p className="text-gray-600">Ofreciendo viajes Seguros desde 2004</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mt-8">
                        <div className="relative w-[180px] h-[180px]">
                            <Image
                                src="/img/driver.png"
                                alt="Travel Agent"
                                fill
                                className="rounded-[2rem] object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="font-medium mb-2">Sobre Mi:</p>
                                <p className="text-gray-600">Soy una persona Profesional y atento a cada detalle. Me gusta prestar buen servicio</p>
                            </div>
                            <div>
                                <p className="font-medium mb-2">Idiomas:</p>
                                <div className="flex flex-wrap gap-4">
                                    <span className="flex items-center gap-1">Ingles <span className="text-lg">🇬🇧</span></span>
                                    <span className="flex items-center gap-1">Frances <span className="text-lg">🇫🇷</span></span>
                                    <span className="flex items-center gap-1">Italiano <span className="text-lg">🇮🇹</span></span>
                                    <span className="flex items-center gap-1">Portugués <span className="text-lg">🇵🇹</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="bg-to-r from-cyan-500 to-blue-500">
                    <FormReserv />
                </div>
            </div>
        </div>
    )
}
