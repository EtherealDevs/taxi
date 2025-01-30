"use client"
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion'
import { ShieldCheck, Handshake, CircleFadingPlus, Car, BookUser } from 'lucide-react'

export default function TrustInUs() {
  const { t } = useTranslation();

  const items = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#6944ff]" />,
      title: t('trustInUs.security.title'),
      description: t('trustInUs.security.description')
    },
    {
      icon: <CircleFadingPlus className="w-8 h-8 text-[#6944ff]" />,
      title: t('trustInUs.experience.title'),
      description: t('trustInUs.experience.description')
    },
    {
      icon: <BookUser className="w-8 h-8 text-[#6944ff]" />,
      title: t('trustInUs.attentionToDetail.title'),
      description: t('trustInUs.attentionToDetail.description')
    },
    {
      icon: <Car className="w-8 h-8 text-[#6944ff]" />,
      title: t('trustInUs.comfort.title'),
      description: t('trustInUs.comfort.description')
    },
    {
      icon: <Handshake className="w-8 h-8 text-[#6944ff]" />,
      title: t('trustInUs.professionalism.title'),
      description: t('trustInUs.professionalism.description')
    }
  ];

  return (
    <div className="bg-gray-100/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">{t('trustInUs.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#ececec] rounded-2xl p-6"
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-center mb-2">{item.title}</h3>
              <p className="text-sm text-[#272727] text-center">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
