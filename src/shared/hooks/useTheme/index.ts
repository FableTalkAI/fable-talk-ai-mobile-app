import { useColorScheme } from 'react-native';

import { base } from '@/app/theme/palettes/base.ts';
import { dark } from '@/app/theme/palettes/dark.ts';
import { light } from '@/app/theme/palettes/light.ts';
import { ThemeColors } from '@/app/theme/types.ts';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';
import { Theme } from '@/features/profile/store/user/types.ts';

import { UseThemeParams } from './types.ts';

const useTheme = (props?: UseThemeParams) => {
  const { themeMode } = props || {};

  const { theme: userTheme } = useUserStore();
  const scheme = useColorScheme();
  const theme = themeMode || userTheme;

  const getThemeColors = (targetTheme?: Theme | null) => {
    const darkMode = { mode: Theme.Dark, colors: dark };
    const lightMode = { mode: Theme.Light, colors: light };
    const activeTheme = targetTheme ?? theme;

    switch (activeTheme) {
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

  const getInvertedColor = (colorKey: keyof ThemeColors, currentThemeMode?: Theme): string => {
    const currentMode = currentThemeMode || getThemeColors().mode;
    const invertedMode = currentMode === Theme.Dark ? Theme.Light : Theme.Dark;
    const invertedPalette: Record<keyof ThemeColors, string> = {
      ...getThemeColors(invertedMode).colors,
    };

    return invertedPalette[colorKey];
  };

  return {
    theme: getThemeColors().mode,
    colors: { ...base, ...getThemeColors().colors },
    setColorOpacity,
    getInvertedColor,
  };
};

export default useTheme;
