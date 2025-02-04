"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Settings,
  LayoutDashboard,
  LogOut,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/auth";
export const languages = [
  {
    code: "en",
    label: "English",
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 72 72"
      >
        <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
        <path fill="#fff" d="M40 28.856V32h10.181L67 21.691V17h-7.654z"></path>
        <path
          fill="#d22f27"
          d="M67 17h-3.827L40 31.203V32h3.482L67 17.586z"
        ></path>
        <path fill="#fff" d="M59.347 55H67v-4.692L50.182 40H40v3.143z"></path>
        <path
          fill="#d22f27"
          d="M67 55v-2.347L46.355 40h-4.787l24.474 15z"
        ></path>
        <path fill="#fff" d="M32 43.144V40H21.819L5 50.309V55h7.654z"></path>
        <path
          fill="#d22f27"
          d="M5 55h3.827L32 40.797V40h-3.482L5 54.414z"
        ></path>
        <path fill="#fff" d="M12.653 17H5v4.692L21.818 32H32v-3.143z"></path>
        <path fill="#d22f27" d="M5 17v2.347L25.646 32h4.786L5.958 17z"></path>
        <path fill="#fff" d="M5 31h62v10H5z"></path>
        <path fill="#fff" d="M31 17h10v38H31z"></path>
        <path fill="#d22f27" d="M5 33h62v6H5z"></path>
        <path fill="#d22f27" d="M33 17h6v38h-6z"></path>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 17h62v38H5z"
        ></path>
      </svg>
    ),
  },
  {
    code: "es",
    label: "Español",
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 72 72"
      >
        <path fill="#1e50a0" d="M5 17h62v38H5z"></path>
        <path fill="#fff" d="M5 17h62v38H5z"></path>
        <path fill="#61b2e4" d="M5 42h62v13H5zm0-25h62v13H5z"></path>
        <path
          fill="#f1b31c"
          stroke="#f1b31c"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M36 33.897L37.236 32l-.06 2.299l2.06-.771l-1.334 1.822L40 36l-2.098.65l1.334 1.822l-2.06-.771l.06 2.299L36 38.103L34.764 40l.06-2.299l-2.06.771l1.334-1.822L32 36l2.098-.65l-1.334-1.822l2.06.771l-.06-2.299z"
          strokeWidth={1}
        ></path>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 17h62v38H5z"
        ></path>
      </svg>
    ),
  },
  {
    code: "pt",
    label: "Português",
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 72 72"
      >
        <path fill="#5c9e31" d="M5 17h62v38H5z"></path>
        <path
          fill="#fcea2b"
          d="m59.023 36.023l-23.157 14.63l-22.889-14.362l23.157-14.63z"
        ></path>
        <circle cx={36} cy={36} r={9} fill="#1e50a0"></circle>
        <path
          fill="#fff"
          d="M44.159 39.782a9 9 0 0 0 .696-2.26a11.474 11.474 0 0 0-17.477-4.04a9 9 0 0 0-.352 2.013a10.998 10.998 0 0 1 17.133 4.287"
        ></path>
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 17h62v38H5z"
        ></path>
      </svg>
    ),
  },
];
export default function Navbar({ user }) {
  const { logout } = useAuth();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    { name: "Bienvenido", href: "#hero" },
    { name: "Reservar Viaje", href: "#reviews" },
    { name: "Confia en Nosotros", href: "#trust-in-us" },
    { name: "¿Cómo Funciona?", href: "#how-it-works" },
    { name: "Contactanos", href: "#contact" },
  ];

  const handleLogin = () => {
    window.location.pathname = "/login";
  };
  const handleRegister = () => {
    window.location.pathname = "/register";
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
  };
  if (!isLoggedIn && user) {
    setIsLoggedIn(true);
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-black">
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

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline-block">
                      {
                        languages.find((lang) => lang.code === i18n.language)
                          ?.flag
                      }
                    </span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
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
                  <DropdownMenuContent align="end" className="w-56 bg-white">
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
                      <Link
                        href="/my-reservations"
                        className="flex items-center"
                      >
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
                <span>
                  <Button onClick={handleLogin}>Iniciar Sesión</Button>
                  <Button onClick={handleRegister}>Registrarse</Button>
                </span>
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
            animate={{ opacity: 1, height: "auto" }}
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      {
                        languages.find((lang) => lang.code === i18n.language)
                          ?.label
                      }
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Configurar perfil
                      </Button>
                    </Link>
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Panel de administración
                      </Button>
                    </Link>
                    <Link href="/my-reservations">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
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
                  <Button className="w-full" size="sm" onClick={handleLogin}>
                    Iniciar Sesión
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({
  href,
  children,
  mobile,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
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
  );
}
