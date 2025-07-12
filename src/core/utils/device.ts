import * as RNLocalize from 'react-native-localize';

// Get the device's default language
const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  return locales[0]?.languageTag || 'en'; // Default to English
};

export { getDeviceLanguage };
