import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/app/locales/en.json';
// Language imports
import uk from '@/app/locales/uk.json';

import { getDeviceLanguage } from './device.ts';

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
