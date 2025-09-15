import { useColorScheme } from 'react-native';

import { base } from '@/core/theme/base.ts';
import { dark } from '@/core/theme/dark.ts';
import { light } from '@/core/theme/light.ts';
import { Theme } from '@/store/user/types.ts';

import useUserStore from './useUserStore.ts';

const useTheme = () => {
  const { theme } = useUserStore();
  const scheme = useColorScheme();

  const getThemeColors = () => {
    switch (theme) {
      case Theme.Dark:
        return dark;
      case Theme.Light:
        return light;
      default:
        return scheme === 'dark' ? dark : light;
    }
  };

  const setColorOpacity = (color: string, opacity: number) => {
    const safeOpacity = Math.max(0, Math.min(1, opacity));
    const alpha = Math.round(safeOpacity * 255);
    const alphaHex = alpha.toString(16).padStart(2, '0');

    return `${color}${alphaHex}`;
  };

  return {
    colors: { ...base, ...getThemeColors() },
    setColorOpacity,
  };
};

export default useTheme;
