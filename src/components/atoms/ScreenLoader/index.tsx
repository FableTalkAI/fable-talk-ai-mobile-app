import { ActivityIndicator, StyleSheet, View } from 'react-native';

import useTheme from '@/hooks/useTheme.ts';

const ScreenLoader = () => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundBase,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScreenLoader;
