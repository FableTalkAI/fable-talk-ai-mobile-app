import { StyleSheet } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';
import Animated, { FadeIn } from 'react-native-reanimated';

import useTheme from '@/shared/hooks/useTheme.ts';

import { ScreenLoaderProps } from './types.ts';

const ScreenLoader = ({ isLoading }: ScreenLoaderProps) => {
  const { colors, setColorOpacity } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: setColorOpacity(colors.gray50, 0.3),
    },
  });

  if (!isLoading) return null;

  return (
    <Animated.View entering={FadeIn} style={[styles.container, computedStyles.container]}>
      <Chase size={48} color={colors.textPrimary} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    inset: 0,
  },
});

export default ScreenLoader;
