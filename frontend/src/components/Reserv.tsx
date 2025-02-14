"use client";

import {
  Clock,
  MapPin,
  Plus,
  ArrowRight,
  ArrowLeft,
  Edit2,
  User,
  Phone,
  Mail,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMap } from "@/hooks/map";
import { useReservation } from "@/hooks/reservations";
import { formatAddresses, FormattedAddress } from "@/lib/formatAddress";
interface FormReservProps {
  onOpenModal: (
    inputName: "departure" | "destination" | "extraStops",
    index?: number
  ) => void;
  location: {
    departure: string;
    destination: string;
    extraStops: string[];
  };
}

interface FormData {
  // Step 1 data
  extraStops: string[];
  date: string;
  time: string;
  // Step 2 data
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  // Location data is passed via props
}
interface Addresses {
  first: string;
  last: string;
  extraStop: string[];
}

export default function FormReserv({ onOpenModal, location }: FormReservProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const { create } = useReservation();
  const [formData, setFormData] = useState<FormData>({
    extraStops: [],
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [addresses, setAddresses] = useState<Addresses>({
    first: "",
    last: "",
    extraStop: [""],
  });
  const { getAddress } = useMap();
  const [stations, setStations] = useState<FormattedAddress[]>();

  const changeAddress = async () => {
    // Get first and last addresses
    let first = await getAddress(location.departure);
    let last = await getAddress(location.destination);
    // Get all extra stop addresses using Promise.all
    let extraStop = await Promise.all(
      location.extraStops.map(async (stop) => {
        const address = await getAddress(stop);
        return address;
      })
    );

    // Set state with resolved addresses
    setAddresses({
      first: first.display_name,
      last: last.display_name,
      extraStop: extraStop.map((address) => address.display_name),
    });
    let stations = formatAddresses(first, last, extraStop);
    setStations(stations);
  };
  const handleInputChange = (field: keyof FormData, value: any) => {
    if (field == "extraStops") {
      setFormData((prev) => ({
        ...prev,
        extraStops: [...prev.extraStops, value],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddExtraStop = () => {
    const value = location.extraStops || [];
    if (!value) {
      setFormData((prev) => ({ ...prev, extraStop: value }));
    }
    // Utiliza handleInputChange para actualizar el estado
    handleInputChange("extraStops", [...formData.extraStops, ""]);
  };

  const handleExtraStopChange = (index: number, value: string) => {
    const newExtraStops = [...formData.extraStops];
    newExtraStops[index] = value;
    handleInputChange("extraStops", newExtraStops);
  };

  const handleRemoveExtraStop = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      extraStops: prev.extraStops.filter((_, i) => i !== index),
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(
          location.departure &&
            location.destination &&
            formData.date &&
            formData.time
        );
      case 2:
        return Boolean(
          formData.firstName &&
            formData.lastName &&
            formData.phone &&
            formData.email
        );
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      await changeAddress();
      setCurrentStep((prev) => prev + 1);
    } else {
      // Show validation error
      alert(t("reserv.pleaseCompleteAllFields"));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const sendForm = async () => {
    const form = new FormData();
    form.append("name", formData.firstName);
    form.append("phone", formData.phone);
    form.append("date_start", formData.date);
    form.append("time_start", formData.time);
    console.log(stations);
    form.append("stations", JSON.stringify(stations));
    await create(form);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let message = `Hola, me gustaría reservar un viaje:\n\n`;
    message += `Desde: ${addresses.first}\n`;

    if (formData.extraStops.length > 0) {
      message += `Paradas:\n`;
      formData.extraStops.forEach((stop, index) => {
        message += `  ${index + 1}. ${stop}\n`;
      });
    }

    message += `Hasta: ${addresses.last}\n`;
    message += `Fecha: ${formData.date}\n`;
    message += `Hora: ${formData.time}\n\n`;
    message += `Nombre: ${formData.firstName} ${formData.lastName}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `Email: ${formData.email}`;

    sendForm();
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/34123456789?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === currentStep
                ? "bg-[#4263EB] text-white"
                : step < currentStep
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {step < currentStep ? "✓" : step}
          </div>
          {step < 3 && (
            <div
              className={`w-12 h-1 ${
                step < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="relative">
        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={t("reserv.departurePlace")}
          className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
          value={location.departure}
          onClick={() => onOpenModal("departure")}
          readOnly
        />
      </div>

      {formData.extraStops.map((stop, index) => (
        <div className="relative" key={index}>
          <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={t("reserv.extraStop")}
            className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
            value={location.extraStops[index]}
            onClick={() => onOpenModal("extraStops", index)}
            readOnly
          />
          <button
            type="button"
            onClick={() => handleRemoveExtraStop(index)}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}

      <div className="relative">
        <button
          type="button"
          onClick={handleAddExtraStop}
          className="w-full py-3 rounded-2xl border border-dashed border-gray-300 text-gray-500 hover:border-[#4263EB] hover:text-[#4263EB] transition-colors"
        >
          <Plus className="inline-block h-5 w-5 mr-2" />
          {t("reserv.addExtraStop")}
        </button>
      </div>

      <div className="relative">
        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={t("reserv.destination")}
          className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
          value={location.destination}
          onClick={() => onOpenModal("destination")}
          readOnly
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="date"
            className="w-full py-3 px-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="relative">
          <Clock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="time"
            className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="relative">
        <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={t("reserv.firstName")}
          className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
      </div>

      <div className="relative">
        <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={t("reserv.lastName")}
          className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="tel"
          placeholder={t("reserv.phone")}
          className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="email"
          placeholder={t("reserv.email")}
          className="w-full pl-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4263EB] focus:border-transparent"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-gray-50 p-6 rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Detalles del Viaje</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(1)}
            className="text-[#4263EB]"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Desde:</span> {addresses.first}
          </p>
          {formData.extraStops.map((stop, index) => (
            <p key={index}>
              <span className="font-medium">Parada {index + 1}:</span>{" "}
              {addresses.extraStop[index]}
            </p>
          ))}
          <p>
            <span className="font-medium">Hasta:</span> {addresses.last}
          </p>
          <p>
            <span className="font-medium">Fecha:</span> {formData.date}
          </p>
          <p>
            <span className="font-medium">Hora:</span> {formData.time}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Información Personal</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(2)}
            className="text-[#4263EB]"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Nombre:</span> {formData.firstName}{" "}
            {formData.lastName}
          </p>
          <p>
            <span className="font-medium">Teléfono:</span> {formData.phone}
          </p>
          <p>
            <span className="font-medium">Email:</span> {formData.email}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex-none w-full md:w-[400px] md:ml-auto sticky translate-x-0 lg:translate-x-9 top-0">
      <div className="w-full border-[#4263EB] border-2 rounded-[2rem] p-8 bg-white shadow-lg">
        <div className="text-sm text-[#4263EB] font-medium mb-4">
          {t("reserv.countries")}
        </div>
        <h2 className="text-2xl font-bold mb-8">{t("reserv.bookYourTrip")}</h2>

        {renderStepIndicator()}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </AnimatePresence>

          <div className="flex gap-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Atrás
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-3xl text-white"
                onClick={handleNext}
              >
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-3xl text-white"
              >
                Confirmar Reserva
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
