"use client"

import { motion } from "framer-motion"
import { Camera, CreditCard, Car, MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState } from "react"

export default function HowItWorks() {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: <Camera className="w-8 h-8 text-[#6944ff]" />,
      title: t("howItWorks.steps.booking"),
      description: t("howItWorks.steps.description"),
    },
    {
      icon: <CreditCard className="w-8 h-8 text-[#6944ff]" />,
      title: t("howItWorks.steps.quotation"),
      description: t("howItWorks.steps.description"),
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#6944ff]" />,
      title: t("howItWorks.steps.payment"),
      description: t("howItWorks.steps.description"),
    },
    {
      icon: <Car className="w-8 h-8 text-[#6944ff]" />,
      title: t("howItWorks.steps.arrival"),
      description: t("howItWorks.steps.description"),
    },
  ]

  return (
    <div className="bg-gray-100/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-start mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-1">{t("howItWorks.title")}</h2>
          <div className="w-24 h-2 bg-blue-500 mt-1 mb-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-[#ececec] rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                activeStep === index ? "shadow-lg scale-105" : ""
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-center mb-2">{step.title}</h3>
              <p className="text-sm text-[#272727] text-center">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 lg:hidden">
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${activeStep === index ? "bg-blue-500" : "bg-gray-300"}`}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

