import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./en/translation.json";
import translationNO from "./no/translation.json";
import translationFI from "./fi/translation.json";
import translationSV from "./sv/translation.json";

const resources = {
  en: { translation: translationEN },
  fi: { translation: translationFI },
  no: { translation: translationNO },
  sv: { translation: translationSV },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
