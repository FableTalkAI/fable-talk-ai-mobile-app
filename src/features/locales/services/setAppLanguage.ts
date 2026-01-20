import i18n from '@/features/locales/i18n.ts';
import { Languages } from '@/features/locales/types.ts';

export const setAppLanguage = async (language: Languages) => {
  await i18n.changeLanguage(language);
};
