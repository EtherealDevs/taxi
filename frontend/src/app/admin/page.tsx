'use client'

import { motion } from 'framer-motion'

export default function AdminDashboard() {
    const stats = [
        { name: 'Total Usuarios', value: '1,234' },
        { name: 'Viajes Completados', value: '5,678' },
        { name: 'Ingresos Totales', value: '$123,456' },
        { name: 'Choferes Activos', value: '89' },
    ]

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <motion.div
                        key={stat.name}
                        className="bg-white p-6 rounded-lg shadow"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-lg font-medium text-gray-500">{stat.name}</h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

