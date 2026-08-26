import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { languageDetector } from './services/languageDetector.ts';
// Language imports
import en from './translations/en.ts';
import ja from './translations/ja.ts';
import ko from './translations/ko.ts';
import uk from './translations/uk.ts';

export const resources = {
  en: { translation: en },
  uk: { translation: uk },
  ja: { translation: ja },
  ko: { translation: ko },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
