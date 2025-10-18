import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useTheme from '@/hooks/useTheme.ts';

import { ComponentLoaderProps } from './types.ts';

const ComponentLoader = ({ isVisible }: ComponentLoaderProps) => {
  const { colors, setColorOpacity } = useTheme();

  const computedStyles = StyleSheet.create({
    loadingContainer: {
      backgroundColor: setColorOpacity(colors.grayDisabled, 0.7),
    },
  });

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[computedStyles.loadingContainer, styles.loadingContainer]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <ActivityIndicator color={colors.textSecondary} />
    </Animated.View>
  );
};

export default ComponentLoader;

const styles = StyleSheet.create({
  loadingContainer: {
    zIndex: 1,
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
