// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next) // интеграция с React
  .init({
    lng: "en", // язык по умолчанию
    ns: [
      "indexPage",
      "menu",
      "roadmap",
      "products",
      "investments",
      "instruction",
      "variants",
      "partners",
      "aboutUs",
      "faq",
      "contacts",
      "login",
      "cabinet",
      "openPlan",
      "topup",
      "confirmTransaction",
      "withdrawn",
      "referrals",
      "settings",
      "documents",
    ],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Путь к файлам перевода
    },
    fallbackLng: "en", // запасной язык
    interpolation: {
      escapeValue: false, // не требуется для React, так как он экранирует по умолчанию
    },
  });

export default i18n;
