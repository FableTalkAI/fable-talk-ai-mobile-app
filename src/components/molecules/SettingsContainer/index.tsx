import { StyleSheet, View } from 'react-native';

import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import useTheme from '@/hooks/useTheme.ts';

import { SettingsContainerProps } from './types.ts';

const SettingsContainer = ({ label, children }: SettingsContainerProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundAlt,
    },
    label: {
      color: colors.textLight,
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
