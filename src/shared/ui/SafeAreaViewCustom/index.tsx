import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';

import { SafeAreaViewCustomProps } from './types.ts';

const SafeAreaViewCustom = ({
  children,
  isTransparent = false,
  withGradientBackground,
  style,
  withHorizontalPadding = true,
  withBottomPadding = true,
  ...safeAreaProps
}: SafeAreaViewCustomProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      paddingHorizontal: withHorizontalPadding ? SPACING.xl : 0,
      paddingTop: top > SPACING.lg ? 0 : SPACING.xs,
      paddingBottom: bottom > SPACING.m || !withBottomPadding ? 0 : SPACING.m,
      backgroundColor: isTransparent || withGradientBackground ? 'transparent' : colors.backgroundBase,
    },
  });

  return (
    <>
      {withGradientBackground && (
        <LinearGradient
          colors={[colors.primary30, colors.backgroundSecondary]}
          locations={[0, 0.27]}
          style={styles.gradient}
        />
      )}
      <SafeAreaView style={[styles.container, computedStyles.container, style]} {...safeAreaProps}>
        {children}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    inset: 0,
  },
});

export default SafeAreaViewCustom;
