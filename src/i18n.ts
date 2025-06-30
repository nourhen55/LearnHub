import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // تحميل ملفات الترجمة من المجلد locales
  .use(HttpApi)
  // اكتشاف لغة المتصفح تلقائيًا
  .use(LanguageDetector)
  // ربط مع react-i18next
  .use(initReactI18next)
  .init({
    supportedLngs: ['fr', 'ar', 'en'],
    fallbackLng: 'fr',
    debug: false,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
