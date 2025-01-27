'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Contacto() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (res.ok) {
                alert('Mensaje enviado correctamente')
                setFormData({ name: '', email: '', phone: '', message: '' })
            } else {
                alert(data.error || 'Error al enviar el mensaje')
            }
        } catch (error) {
            console.error('Error en el servidor', error)
            alert('Error en el servidor')
        }
    }


    return (
        <div className="bg-transparent min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="lg:flex">
                    <div className="lg:w-1/2 bg-gray-900 text-white p-8 lg:p-12">
                        <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
                        <p className="text-gray-300 mb-6">
                            {t('contact.description')}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Phone className="w-6 h-6 mr-4 text-blue-400" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-6 h-6 mr-4 text-blue-400" />
                                <span>contact@profdriver.com</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-6 h-6 mr-4 text-blue-400" />
                                <span>123 Travel Lane, Global City</span>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">{t('contact.getInTouch')}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.phone')}</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('contact.message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                            >
                                <Send className="w-5 h-5 mr-2" />
                                {t('contact.sendMessage')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

