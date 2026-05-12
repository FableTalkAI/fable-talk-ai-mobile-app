import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useTheme from '@/shared/hooks/useTheme';
import { SPACING } from '@/shared/model/sizes.ts';

import { SafeAreaViewCustomProps } from './types.ts';

const SafeAreaViewCustom = ({
  children,
  isTransparent = false,
  withGradientBackground,
  style,
  withHorizontalPadding = true,
  withBottomPadding = true,
  edges = ['top', 'bottom'],
}: SafeAreaViewCustomProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const { top, bottom } = useMemo(
    () => ({
      top: edges.includes('top') ? insets.top : 0,
      bottom: edges.includes('bottom') ? insets.bottom : 0,
    }),
    [edges, insets],
  );

  const computedStyles = StyleSheet.create({
    container: {
      paddingHorizontal: withHorizontalPadding ? SPACING.xl : 0,
      paddingTop: top > SPACING.lg ? top + SPACING.xxs : top + SPACING.xs,
      paddingBottom: bottom > SPACING.m || !withBottomPadding ? bottom : bottom + SPACING.m,
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
      <View style={[styles.container, computedStyles.container, style]}>{children}</View>
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
