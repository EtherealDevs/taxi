'use client'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import FormReserv from "../Reserv"
import Image from "next/image"
import MapModal from '../ui/MapModal';

export default function Hero() {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeInput, setActiveInput] = useState<'departure' | 'destination' | 'extraStop' | null>(null);
    const [location, setLocation] = useState({ departure: '', destination: '', extraStop: '' });

    const handleOpenModal = (inputName: 'departure' | 'destination' | 'extraStop') => {
        setActiveInput(inputName);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setActiveInput(null);
    };

    const handleSelectLocation = (lat: number, lng: number) => {
        if (activeInput) {
            setLocation({ ...location, [activeInput]: `${lat}, ${lng}` });
        }
        handleCloseModal();
    };

    return (
        <div className="w-full min-h-screen bg-transparent p-4 md:p-8 flex items-center">
            <div className="w-full max-w-6xl bg-transparent mx-auto flex flex-col md:flex-row gap-8 items-start">
                {/* Columna Izquierda */}
                <div className="flex-1 space-y-6 p-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{t('hero.name')}</h1>
                        <p className="text-gray-600">{t('hero.internationalTrips')}</p>
                        <p className="text-gray-600">{t('hero.safeTrips')}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mt-8">
                        <div className="relative w-[180px] h-[180px]">
                            <Image
                                src="/img/driver.png"
                                alt={t('hero.imageAlt')}
                                fill
                                className="rounded-[2rem] object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="font-medium mb-2">{t('hero.aboutMe')}:</p>
                                <p className="text-gray-600">{t('hero.aboutMeDescription')}</p>
                            </div>
                            <div>
                                <p className="font-medium mb-2">{t('hero.languages')}:</p>
                                <div className="flex flex-wrap gap-4">
                                    <span className="flex items-center gap-1">{t('hero.english')} <span className="text-lg">🇬🇧</span></span>
                                    <span className="flex items-center gap-1">{t('hero.french')} <span className="text-lg">🇫🇷</span></span>
                                    <span className="flex items-center gap-1">{t('hero.italian')} <span className="text-lg">🇮🇹</span></span>
                                    <span className="flex items-center gap-1">{t('hero.portuguese')} <span className="text-lg">🇵🇹</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="bg-to-r from-cyan-500 to-blue-500">
                    <FormReserv onOpenModal={handleOpenModal} location={location} />
                </div>
            </div>
            {isModalOpen && <MapModal onClose={handleCloseModal} onSelectLocation={handleSelectLocation} />}
        </div>
    )
}