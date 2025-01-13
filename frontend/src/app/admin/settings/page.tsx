'use client'

import { motion } from 'framer-motion'

export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Configuración</h1>
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
                <form>
                    <div className="mb-6">
                        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nombre del Sitio
                        </label>
                        <input
                            type="text"
                            id="siteName"
                            name="siteName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                            placeholder="Chofer Connect"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email de Contacto
                        </label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                            placeholder="contacto@choferconnect.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Idioma Predeterminado
                        </label>
                        <select
                            id="language"
                            name="language"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                        >
                            <option value="es">Español</option>
                            <option value="en">English</option>
                            <option value="pt">Português</option>
                        </select>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Guardar Cambios
                    </motion.button>
                </form>
            </div>
        </div>
    )
}

