import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationFR from "../locales/fr/translation.json";
import translationEN from "../locales/en/translation.json";
import translationDE from "../locales/de/translation.json";
import translationES from "../locales/es/translation.json";
import translationIT from "../locales/it/translation.json";
import translationPT from "../locales/pt/translation.json";
import translationJP from "../locales/jp/translation.json";

const resources = {
  fr: { translation: translationFR },
  en: { translation: translationEN },
  de: { translation: translationDE },
  es: { translation: translationES },
  it: { translation: translationIT },
  pt: { translation: translationPT },
  jp: { translation: translationJP },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
