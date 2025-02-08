"use client";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star, Globe, Award, Clock, MapPin } from "lucide-react";
import { languages } from "../Navbar";

import FormReserv from "../Reserv";
import Image from "next/image";
import { SparklesPreview } from "@/components/anim/Sparkless";

const MapModal = dynamic(() => import("../ui/MapModal"), {
    ssr: false,
});

const stats = [
    {
        value: "100%",
        label: "security",
        icon: <Award className="w-5 h-5 text-blue-600" />,
    },
    {
        value: "+200",
        label: "trayectory",
        icon: <MapPin className="w-5 h-5 text-blue-600" />,
    },
    {
        value: "4.5",
        label: "quality",
        icon: <Star className="w-5 h-5 text-yellow-400" />,
    },
    {
        value: "5",
        sublabel: "years",
        label: "experience",
        icon: <Clock className="w-5 h-5 text-blue-600" />,
    },
];

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
                <div className="flex-1 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center lg:text-left mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-light mb-2">
                            Bienvenido, Soy{" "}
                            <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Nelson Olivera
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Profile Image Column */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative"
                            >
                                <div className="relative w-[240px] h-full mx-auto">
                                    <div className="absolute inset-0 top-4 bg-gradient-to-b from-transparent via-white/50 to-white rounded-[2rem] z-10" />
                                    <Image
                                        src="/img/driver.png"
                                        alt={t("hero.imageAlt")}
                                        width={240}
                                        height={240}
                                        className="rounded-[2rem] object-cover"
                                    />
                                </div>
                                <div className="mt-12">
                                    <SparklesPreview />
                                </div>
                            </motion.div>
                        </div>

                        {/* Info Column */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex flex-wrap gap-2 items-center">
                                    <Badge
                                        variant="secondary"
                                        className="text-blue-600 bg-blue-50"
                                    >
                                        Chofer Profesional
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">
                                            4.9 (200+ reseñas)
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-gray-600 font-medium">
                                        {t("hero.internationalTrips")}
                                    </p>
                                    <p className="text-gray-600 italic">{t("hero.safeTrips")}</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg">{t("hero.aboutMe")}:</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t("hero.aboutMeDescription")}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-blue-600" />
                                        <h3 className="font-bold text-lg">
                                            {t("hero.languages")}:
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {languages.map(({ label, flag }) => (
                                            <Badge key={label} variant="outline" className="text-sm">
                                                {t(`${label}`)} <span className="ml-1">{flag}</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-3 w-full">
                            {/* Stats Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                            >
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-center mb-2">{stat.icon}</div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {stat.value} {stat.sublabel && t(`hero.${stat.sublabel}`)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {t(`hero.${stat.label}`)}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
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
