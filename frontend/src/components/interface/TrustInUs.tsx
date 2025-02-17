"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { ShieldCheck, Handshake, CircleFadingPlus, Car, BookUser } from "lucide-react"

export default function TrustInUs() {
  const { t } = useTranslation()

  const items = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#6944ff]" />,
      title: t("trustInUs.security.title"),
      description: t("trustInUs.security.description"),
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#6944ff]" />,
      title: t("trustInUs.recomendation.title"),
      description: t("trustInUs.recomendation.description"),
    },
    {
      icon: <CircleFadingPlus className="w-8 h-8 text-[#6944ff]" />,
      title: t("trustInUs.experience.title"),
      description: t("trustInUs.experience.description"),
    },
    {
      icon: <BookUser className="w-8 h-8 text-[#6944ff]" />,
      title: t("trustInUs.attentionToDetail.title"),
      description: t("trustInUs.attentionToDetail.description"),
    },
    {
      icon: <Car className="w-8 h-8 text-[#6944ff]" />,
      title: t("trustInUs.comfort.title"),
      description: t("trustInUs.comfort.description"),
    },
    {
      icon: <Handshake className="w-8 h-8 text-[#6944ff]" />,
      title: t("trustInUs.professionalism.title"),
      description: t("trustInUs.professionalism.description"),
    },
  ]

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t("trustInUs.title")}</h2>
          <div className="w-24 h-1 bg-[#6944ff] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="bg-[#6944ff]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-4">{item.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

