import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/core/locales/en.json';
// Language imports
import uk from '@/core/locales/uk.json';
import { getDeviceLanguage } from '@/core/utils/device.ts';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
