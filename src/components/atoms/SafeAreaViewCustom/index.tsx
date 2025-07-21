import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaViewCustomProps } from './types.ts';
import { StyleSheet } from 'react-native';
import { SPACING } from '@/core/constants/sizes.ts';

const SafeAreaViewCustom = ({ children }: SafeAreaViewCustomProps) => {
  const insets = useSafeAreaInsets();

  const computedStyles = StyleSheet.create({
    container: {
      paddingHorizontal: SPACING.xl,
      marginTop: insets.top ? 0 : SPACING.lg,
      marginBottom: insets.bottom ? 0 : SPACING.lg,
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
