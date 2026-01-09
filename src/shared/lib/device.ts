import * as RNLocalize from 'react-native-localize';

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  return locales[0]?.languageTag || 'en';
};

export { getDeviceLanguage };
