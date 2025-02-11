"use client"

import { type FormEvent, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth"
import validateRegisterForm from "@/app/server/validation/register"
import { useTranslation } from "react-i18next"

export default function RegisterPage() {
  const { t } = useTranslation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errors, setErrors] = useState<any>()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const errorBag = validateRegisterForm(formData)

    if (!errorBag) {
      register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        setErrors,
      })
    } else {
      setErrors(errorBag)
    }
  }

  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  })

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-xl"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Crear nueva cuenta</h1>
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
              Iniciar sesión
            </Link>
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-6">
          <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Juan Pérez"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {errors?.name && <p className="mt-1 text-sm text-red-600">{t("validation.maxLength")}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="juan@ejemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors?.email && <p className="mt-1 text-sm text-red-600">{t("validation.email")}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors?.password && <p className="mt-1 text-sm text-red-600">{t("validation.password")}</p>}
          </motion.div>

          <motion.div variants={inputVariants} whileFocus="focus" whileBlur="blur">
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type={showPasswordConfirmation ? "text" : "password"}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="••••••••"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
              >
                {showPasswordConfirmation ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors?.confirmPassword && <p className="mt-1 text-sm text-red-600">{t("validation.confirmPassword")}</p>}
          </motion.div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Crear cuenta
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

