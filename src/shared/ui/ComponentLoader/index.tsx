import { StyleSheet } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Theme } from '@/features/profile/store/user/types.ts';
import useTheme from '@/shared/hooks/useTheme';

import { ComponentLoaderProps } from './types.ts';

const ComponentLoader = ({ isVisible }: ComponentLoaderProps) => {
  const { colors, setColorOpacity, theme } = useTheme();

  const computedStyles = StyleSheet.create({
    loadingContainer: {
      backgroundColor: setColorOpacity(theme === Theme.Dark ? colors.gray80 : colors.grayDisabled, 0.7),
    },
  });

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[computedStyles.loadingContainer, styles.loadingContainer]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Chase size={36} color={colors.textSecondary} />
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
