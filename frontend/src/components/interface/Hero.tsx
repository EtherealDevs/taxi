"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import dynamic from "next/dynamic";

import FormReserv from "../Reserv";
import Image from "next/image";
import { SparklesPreview } from "@/components/anim/Sparkless";

const MapModal = dynamic(() => import("../ui/MapModal"), {
    ssr: false,
});
export default function Hero() {
    const { t } = useTranslation();
    const [activeInput, setActiveInput] = useState<
        "departure" | "destination" | "extraStops" | null
    >(null);
    const [location, setLocation] = useState({
        departure: "",
        destination: "",
        extraStops: [],
    });
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    const handleOpenModal = (
        inputName: "departure" | "destination" | "extraStops"
    ) => {
        setActiveInput(inputName);
        setIsMapModalOpen(true);
    };

    const handleCloseMapModal = () => {
        setIsMapModalOpen(false);
        setActiveInput(null);
    };

    const handleSelectLocation = (lat: number, lng: number) => {
        if (activeInput) {
            setLocation((prevLocation) => ({
                ...prevLocation,
                [activeInput]: `${lat}, ${lng}`,
            }));
        }
        handleCloseMapModal();
    };

    return (
        <div className="w-full min-h-screen bg-transparent p-4 md:p-8 flex items-center">
            <div className="w-full max-w-6xl bg-transparent mx-auto flex flex-col md:flex-row gap-8 items-start">

                {/* Columna Izquierda */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 space-y-6 p-4 md:p-8">
                    <div className="col-span-1 lg:col-span-3 w-full">
                        <h1 className="font-bold text-3xl md:text-4xl text-gray-900 ">
                            Nelson Olivera <span className="text-blue-700 ml-2">Viajes</span>
                        </h1>
                    </div>
                    <div className="col-span-1 lg:col-span-1 flex justify-center">
                        <div className="relative w-[180px] h-[380px] md:w-[240px] md:h-[240px]">
                            <div className="absolute md:top-20 z-10 bg-gradient-to-t from-white via-white/50 to-transparent p-4 rounded-xl w-full h-full">
                            </div>
                            <Image
                                src="/img/driver.png"
                                alt={t("hero.imageAlt")}
                                width={240}
                                height={240}
                                className="rounded-[2rem] object-cover"
                            />
                            <div className="relative mt-12 z-10">
                                <SparklesPreview />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <p className="text-gray-600 font-bold italic">{t("hero.internationalTrips")}</p>
                        <p className="text-gray-600 font-bold italic">{t("hero.safeTrips")}</p>

                        <div className="flex flex-col md:flex-row gap-6 mt-8">
                            <div className="space-y-6">
                                <div className="bg-slate-100 p-4 rounded-xl">
                                    <p className="font-medium mb-2">{t("hero.aboutMe")}:</p>
                                    <p className="text-gray-600">
                                        {t("hero.aboutMeDescription")}
                                    </p>
                                </div>
                                <div className="bg-slate-100 p-4 rounded-xl">
                                    <h2 className="font-medium mb-2">{t("hero.languages")}:</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                        <span className="col-span-1 gap-1">
                                            {t("hero.english")} <span className="text-lg">🇬🇧</span>
                                        </span>
                                        <span className="col-span-1 gap-1">
                                            {t("hero.french")} <span className="text-lg">🇫🇷</span>
                                        </span>
                                        <span className="col-span-1 gap-1">
                                            {t("hero.italian")} <span className="text-lg">🇮🇹</span>
                                        </span>
                                        <span className="col-span-1 gap-1">
                                            {t("hero.portuguese")} <span className="text-lg">🇵🇹</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 w-full justify-between mt-8">
                            <div className="col-span-1 text-center">
                                <p className="text-3xl md:text-2xl font-bold text-gray-900">100%</p>
                                <p className="text-gray-600">{t("hero.security")}</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <p className="text-3xl md:text-2xl font-bold text-gray-900">+200</p>
                                <p className="text-gray-600">{t("hero.trayectory")}</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <p className="text-3xl md:text-2xl font-bold text-gray-900">4.5</p>
                                <p className="text-gray-600">{t("hero.quality")}</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <p className="text-3xl md:text-2xl font-bold text-gray-900">
                                    5 {t("hero.years")}
                                </p>
                                <p className="text-gray-600">{t("hero.experience")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="bg-to-r from-cyan-500 to-blue-500">
                    <FormReserv onOpenModal={handleOpenModal} location={location} />
                </div>
            </div>
            {isMapModalOpen && (
                <MapModal
                    onClose={handleCloseMapModal}
                    onSelectLocation={handleSelectLocation}
                />
            )}
        </div>
    );
}
