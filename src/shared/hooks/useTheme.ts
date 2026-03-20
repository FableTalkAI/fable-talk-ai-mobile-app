import { useColorScheme } from 'react-native';

import { base } from '@/app/theme/base.ts';
import { dark } from '@/app/theme/dark.ts';
import { light } from '@/app/theme/light.ts';
import { Theme } from '@/features/profile/store/user/types.ts';

import useUserStore from '../../features/profile/hooks/useUserStore.ts';

const useTheme = () => {
  const { theme } = useUserStore();
  const scheme = useColorScheme();

  const getThemeColors = () => {
    const darkMode = {
      mode: Theme.Dark,
      colors: dark,
    };

    const lightMode = {
      mode: Theme.Light,
      colors: light,
    };

    switch (theme) {
      case Theme.Dark:
        return darkMode;
      case Theme.Light:
        return lightMode;
      default:
        return scheme === 'dark' ? darkMode : lightMode;
    }
  };

  const setColorOpacity = (color: string, opacity: number) => {
    const safeOpacity = Math.max(0, Math.min(1, opacity));
    const alpha = Math.round(safeOpacity * 255);
    const alphaHex = alpha.toString(16).padStart(2, '0');

    return `${color}${alphaHex}`;
  };

  return {
    theme: getThemeColors().mode,
    colors: { ...base, ...getThemeColors().colors },
    setColorOpacity,
  };
};

export default useTheme;
