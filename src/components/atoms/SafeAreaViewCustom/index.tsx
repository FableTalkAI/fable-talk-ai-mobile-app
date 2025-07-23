import { StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { SPACING } from '@/core/constants/sizes.ts';
import useTheme from '@/hooks/useTheme.ts';

import { SafeAreaViewCustomProps } from './types.ts';

const SafeAreaViewCustom = ({ children }: SafeAreaViewCustomProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      paddingHorizontal: SPACING.xl,
      paddingTop: insets.top ? 0 : SPACING.lg,
      paddingBottom: insets.bottom ? 0 : SPACING.lg,
      backgroundColor: colors.backgroundBase,
    },
  });

  return <SafeAreaView style={[styles.flex1, computedStyles.container]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default SafeAreaViewCustom;
