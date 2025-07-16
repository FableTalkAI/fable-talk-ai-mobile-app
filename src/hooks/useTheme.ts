import { useColorScheme } from 'react-native';
import { dark } from '@/core/theme/dark.ts';
import { light } from '@/core/theme/light.ts';

const useTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    colors: isDark ? dark : light,
  };
};

export default useTheme;
