import { StyleSheet, View } from 'react-native';
import { Pulse } from 'react-native-animated-spinkit';

import { LogoIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';

import TextCustom from './TextCustom';
import { TextModes } from './TextCustom/types.ts';

const AppStub = () => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundBase,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <Pulse size={200} color={colors.iconPrimary} style={styles.loader} />
      <LogoIcon width={100} height={100} />
      <TextCustom text="FableTalkAI" mode={TextModes.Subtitle} textColor={colors.textPrimary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute',
  },
});

export default AppStub;
