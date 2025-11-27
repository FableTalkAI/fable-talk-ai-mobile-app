import { StyleSheet, View } from 'react-native';

import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import { BOX_SHADOW } from '@/core/constants/styles.ts';
import useTheme from '@/hooks/useTheme.ts';

import { ToastCustomProps } from './types.ts';

const ToastCustom = ({ text1, text2, color }: ToastCustomProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    container: {
      borderLeftColor: color,
      backgroundColor: colors.backgroundSecondary,
      boxShadow: BOX_SHADOW.strong,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <TextCustom mode={TextModes.Secondary} style={styles.text1} text={text1 || ''} />
      <TextCustom
        numberOfLines={5}
        mode={TextModes.Tag}
        textColor={colors.textPrimary}
        style={styles.text2}
        text={text2 || ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACING.xl,
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.xs,
    borderRadius: RADIUS.small,
    gap: SPACING.xxs,
    borderLeftWidth: 6,
    maxWidth: 500,
  },
  text1: {
    fontWeight: 'bold',
  },
  text2: {
    opacity: 0.7,
  },
});

export default ToastCustom;
