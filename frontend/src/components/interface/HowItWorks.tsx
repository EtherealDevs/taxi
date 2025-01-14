'use client'

import { motion } from 'framer-motion'
import { Camera, CreditCard, Car, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
    const { t } = useTranslation();

    const steps = [
        {
            icon: <Camera className="w-8 h-8 text-[#6944ff]" />,
            title: t('howItWorks.steps.booking'),
            description: t('howItWorks.steps.description')
        },
        {
            icon: <CreditCard className="w-8 h-8 text-[#6944ff]" />,
            title: t('howItWorks.steps.quotation'),
            description: t('howItWorks.steps.description')
        },
        {
            icon: <MapPin className="w-8 h-8 text-[#6944ff]" />,
            title: t('howItWorks.steps.payment'),
            description: t('howItWorks.steps.description')
        },
        {
            icon: <Car className="w-8 h-8 text-[#6944ff]" />,
            title: t('howItWorks.steps.arrival'),
            description: t('howItWorks.steps.description')
        }
    ]

    return (
        <div className="bg-transparent py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl font-bold mb-4">{t('howItWorks.title')}</h2>
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