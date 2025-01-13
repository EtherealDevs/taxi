'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { name: 'Inicio', href: '/' },
        { name: 'Realizar Viaje', href: '/realizar-viaje' },
        { name: 'Nuestros Viajes', href: '/nuestros-viajes' },
        { name: 'Cómo Funciona?', href: '/como-funciona' },
        { name: 'Contacto', href: '/contacto' },
    ]

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-[#6944ff]">
                            Chofer Connect
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map((item) => (
                            <NavLink key={item.name} href={item.href}>
                                {item.name}
                            </NavLink>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#6944ff] text-white px-4 py-2 rounded-full font-medium hover:bg-[#5933ff] transition-colors"
                        >
                            Iniciar Sesión
                        </motion.button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#272727] hover:text-[#6944ff] focus:outline-none"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <NavLink key={item.name} href={item.href} mobile>
                            {item.name}
                        </NavLink>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-[#6944ff] text-white px-4 py-2 rounded-full font-medium hover:bg-[#5933ff] transition-colors mt-4"
                    >
                        Iniciar Sesión
                    </motion.button>
                </div>
            </motion.div>
        </nav>
    )
}

function NavLink({ href, children, mobile = false }: { href: string; children: React.ReactNode; mobile?: boolean }) {
    return (
        <Link href={href}>
            <motion.span
                className={`${mobile ? 'block' : 'inline-block'
                    } px-3 py-2 rounded-md text-base font-medium text-[#272727] hover:text-[#6944ff] hover:bg-gray-100`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {children}
            </motion.span>
        </Link>
    )
}

