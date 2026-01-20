import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

import { resources } from '@/features/locales/i18n.ts';

const STORAGE_KEY = 'APP_LANGUAGE';

export const languageDetector = {
  type: 'languageDetector' as const,
  async: true,

  detect: async (callback: (lng: string) => void) => {
    const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);

    if (savedLanguage) {
      callback(savedLanguage);
      return;
    }

    const locales = RNLocalize.getLocales();

    const deviceLanguage = locales[0]?.languageCode ?? Object.keys(resources)[0];

    callback(deviceLanguage);
  },

  init: () => {},

  cacheUserLanguage: async (language: string) => {
    await AsyncStorage.setItem(STORAGE_KEY, language);
  },
};
