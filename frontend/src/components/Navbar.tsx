'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Settings, LayoutDashboard, LogOut, Globe, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
    const { i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const navItems = [
        { name: 'Bienvenido', href: '#hero' },
        { name: 'Reservar Viaje', href: '#reviews' },
        { name: 'Confia en Nosotros', href: '#trust-in-us' },
        { name: '¿Cómo Funciona?', href: '#how-it-works' },
        { name: 'Contactanos', href: '#contact' },
    ]

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'pt', label: 'Português', flag: '🇧🇷' },
    ]

    const handleLogin = () => setIsLoggedIn(true)
    const handleLogout = () => setIsLoggedIn(false)

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                        >
                            Nelson Olivera
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <NavLink key={item.name} href={item.href}>
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4"></div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <Globe className="h-4 w-4" />
                                        <span className="hidden sm:inline-block">
                                            {languages.find(lang => lang.code === i18n.language)?.flag}
                                        </span>
                                        <ChevronDown className="h-3 w-3 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {languages.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            onClick={() => i18n.changeLanguage(lang.code)}
                                        >
                                            <span className="mr-2">{lang.flag}</span>
                                            {lang.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {isLoggedIn ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="relative h-9 w-9 rounded-full"
                                        >
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Configurar perfil</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin" className="flex items-center">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                <span>Panel de administración</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/my-reservations" className="flex items-center">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                <span>Mis Reservas</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Cerrar sesión</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button onClick={handleLogin}>
                                    Iniciar Sesión
                                </Button>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-4">
                            <div className="grid gap-3">
                                {navItems.map((item) => (
                                    <NavLink key={item.name} href={item.href} mobile>
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>

                            <div className="grid gap-4 pt-4 border-t">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                                            <Globe className="h-4 w-4" />
                                            {languages.find(lang => lang.code === i18n.language)?.label}
                                            <ChevronDown className="ml-auto h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-full">
                                        {languages.map((lang) => (
                                            <DropdownMenuItem
                                                key={lang.code}
                                                onClick={() => i18n.changeLanguage(lang.code)}
                                            >
                                                <span className="mr-2">{lang.flag}</span>
                                                {lang.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {isLoggedIn ? (
                                    <div className="grid gap-2">
                                        <Link href="/profile">
                                            <Button variant="outline" size="sm" className="w-full justify-start">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Configurar perfil
                                            </Button>
                                        </Link>
                                        <Link href="/admin">
                                            <Button variant="outline" size="sm" className="w-full justify-start">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Panel de administración
                                            </Button>
                                        </Link>
                                        <Link href="/my-reservations">
                                            <Button variant="outline" size="sm" className="w-full justify-start">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Mis Reservas
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Cerrar sesión
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        className="w-full"
                                        size="sm"
                                        onClick={handleLogin}
                                    >
                                        Iniciar Sesión
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

function NavLink({
    href,
    children,
    mobile
}: {
    href: string
    children: React.ReactNode
    mobile?: boolean
}) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                mobile && "flex w-full items-center"
            )}
        >
            {children}
        </Link>
    )
}

