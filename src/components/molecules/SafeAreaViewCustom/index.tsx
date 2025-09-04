import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { SafeAreaViewCustomProps } from './types.ts';

const SafeAreaViewCustom = ({
  children,
  isTransparent = false,
  withGradientBackground,
  style,
}: SafeAreaViewCustomProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      paddingTop: insets.top > 24 ? 0 : SPACING.lg,
      paddingBottom: insets.bottom > 24 ? 0 : SPACING.lg,
      backgroundColor: isTransparent || withGradientBackground ? 'transparent' : colors.backgroundBase,
    },
  });

  return (
    <>
      {withGradientBackground && (
        <LinearGradient
          colors={[colors.primary10, colors.backgroundAlt]}
          locations={[0, 0.27]}
          style={styles.gradient}
        />
      )}
      <SafeAreaView style={[styles.container, computedStyles.container, style]}>{children}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  gradient: {
    position: 'absolute',
    inset: 0,
  },
});

export default SafeAreaViewCustom;
