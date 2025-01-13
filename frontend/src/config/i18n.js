import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa tus archivos de traducción
import translationES from "../locale/es/translation.json";
import translationEN from "../locale/en/translation.json";
import translationPT from "../locale/pt/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: translationES },
    en: { translation: translationEN },
    pt: { translation: translationPT },
  },
  lng: "es", // Idioma por defecto
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
