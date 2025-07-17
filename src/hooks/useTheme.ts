import { useColorScheme } from 'react-native';
import { dark } from '@/core/theme/dark.ts';
import { light } from '@/core/theme/light.ts';
import { base } from '@/core/theme/base.ts';

const useTheme = () => {
  const scheme = useColorScheme();
  const themeColors = scheme === 'dark' ? dark : light;

  const setColorOpacity = (color: string, opacity: number) => {
    const safeOpacity = Math.max(0, Math.min(1, opacity));
    const alpha = Math.round(safeOpacity * 255);
    const alphaHex = alpha.toString(16).padStart(2, '0');

    return `${color}${alphaHex}`;
  };

  return {
    colors: { ...base, ...themeColors },
    setColorOpacity,
  };
};

export default useTheme;
