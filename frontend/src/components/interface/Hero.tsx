'use client'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import FormReserv from "../Reserv"
import Image from "next/image"
import { SparklesPreview } from "@/components/anim/Sparkless";

const MapModal = dynamic(() => import('../ui/MapModal'), {
    ssr: false,
});
export default function Hero() {
    const { t } = useTranslation();
    const [activeInput, setActiveInput] = useState<'departure' | 'destination' | 'extraStop' | null>(null);
    const [location, setLocation] = useState({ departure: '', destination: '', extraStop: '' });
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    const handleOpenModal = (inputName: 'departure' | 'destination' | 'extraStop') => {
        setActiveInput(inputName);
        setIsMapModalOpen(true);
    };

    const handleCloseMapModal = () => {
        setIsMapModalOpen(false);
        setActiveInput(null);
    };

    const handleSelectLocation = (lat: number, lng: number) => {
        if (activeInput) {
            setLocation(prevLocation => ({
                ...prevLocation,
                [activeInput]: `${lat}, ${lng}`
            }));
        }
        handleCloseMapModal();
    };

    return (
        <div className="w-full min-h-screen bg-transparent p-4 md:p-8 flex items-center">
            <div className="w-full max-w-6xl bg-transparent mx-auto flex flex-col md:flex-row gap-8 items-start">
                {/* Columna Izquierda */}
                <div className="flex-1 grid grid-cols-3 space-y-6 p-8">
                    <div className='col-span-3 w-full'>
                        <h1 className='font-bold text-3xl text-gray-900 '>Nelson Olivera <span className='text-cyan-800 ml-2'>Viajes</span></h1>
                    </div>
                    <div className='col-span-1'>
                        <div className="relative w-[180px] h-[180px]">
                            <Image
                                src="/img/driver.png"
                                alt={t('hero.imageAlt')}
                                fill
                                className="rounded-[2rem] object-cover"
                            />
                            <div>
                                <SparklesPreview />
                            </div>
                        </div>
                    </div>

                    <div className='col-span-2'>
                        <p className="text-gray-600">{t('hero.internationalTrips')}</p>
                        <p className="text-gray-600">{t('hero.safeTrips')}</p>

                        <div className="flex flex-col md:flex-row gap-6 mt-8">

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
                        <div className="flex justify-between mt-8">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-gray-900">100%</p>
                                <p className="text-gray-600">{t('hero.security')}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-gray-900">+200</p>
                                <p className="text-gray-600">{t('hero.trayectory')}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-gray-900">4.5</p>
                                <p className="text-gray-600">{t('hero.quality')}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-gray-900">5 {t('hero.years')}</p>
                                <p className="text-gray-600">{t('hero.experience')}</p>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Columna Derecha */}
                <div className="bg-to-r from-cyan-500 to-blue-500">
                    <FormReserv onOpenModal={handleOpenModal} location={location} />
                </div>
            </div>
            {isMapModalOpen && <MapModal onClose={handleCloseMapModal} onSelectLocation={handleSelectLocation} />}
        </div>
    )
}