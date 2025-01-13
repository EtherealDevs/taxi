'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Settings, LayoutDashboard, LogOut } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const navItems = [
        { name: 'Inicio', href: '/' },
        { name: 'Realizar Viaje', href: '/realizar-viaje' },
        { name: 'Nuestros Viajes', href: '/nuestros-viajes' },
        { name: 'Cómo Funciona?', href: '/como-funciona' },
        { name: 'Contacto', href: '/contacto' },
    ]

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        setIsProfileOpen(false)
    }

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
                        {isLoggedIn ? (
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#6944ff] text-white p-2 rounded-full"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <User size={20} />
                                </motion.button>
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                                        >
                                            <ProfileMenuItem href="/profile" icon={<Settings size={16} />}>
                                                Configurar perfil
                                            </ProfileMenuItem>
                                            <ProfileMenuItem href="/admin" icon={<LayoutDashboard size={16} />}>
                                                Panel de administración
                                            </ProfileMenuItem>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <LogOut size={16} className="mr-2" />
                                                Cerrar sesión
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#6944ff] text-white px-4 py-2 rounded-full font-medium hover:bg-[#5933ff] transition-colors"
                                onClick={handleLogin}
                            >
                                Iniciar Sesión
                            </motion.button>
                        )}
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden z-50"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <NavLink key={item.name} href={item.href} mobile>
                                    {item.name}
                                </NavLink>
                            ))}
                            {isLoggedIn ? (
                                <>
                                    <ProfileMenuItem href="/profile" icon={<Settings size={16} />} mobile>
                                        Configurar perfil
                                    </ProfileMenuItem>
                                    <ProfileMenuItem href="/admin" icon={<LayoutDashboard size={16} />} mobile>
                                        Panel de administración
                                    </ProfileMenuItem>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#272727] hover:text-[#6944ff] hover:bg-gray-100 flex items-center"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-[#6944ff] text-white px-4 py-2 rounded-full font-medium hover:bg-[#5933ff] transition-colors mt-4"
                                    onClick={handleLogin}
                                >
                                    Iniciar Sesión
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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

function ProfileMenuItem({ href, icon, children, mobile = false }: { href: string; icon: React.ReactNode; children: React.ReactNode; mobile?: boolean }) {
    return (
        <Link href={href}>
            <motion.span
                className={`${mobile ? 'block' : 'inline-block'
                    } px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full flex items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {children}
            </motion.span>
        </Link>
    )
}

