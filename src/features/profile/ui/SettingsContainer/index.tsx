import { StyleSheet, View } from 'react-native';

import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { SettingsContainerProps } from './types.ts';

const SettingsContainer = ({ label, children }: SettingsContainerProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundSecondary,
    },
  });

  return (
    <View style={styles.wrapper}>
      <TextCustom style={styles.label} text={label} mode={TextModes.Secondary} />
      <View style={[styles.container, computedStyles.container]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: SPACING.xs,
  },
  container: {
    borderRadius: RADIUS.small,
    padding: SPACING.m,
    gap: SPACING.m,
    boxShadow: BOX_SHADOW.base,
  },
  label: {
    textTransform: 'uppercase',
  },
});

export default SettingsContainer;
