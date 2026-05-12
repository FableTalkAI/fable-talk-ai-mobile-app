import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { CheckmarkIcon } from '@/shared/assets/icons/index.ts';
import useTheme from '@/shared/hooks/useTheme';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import PressableCustom from '@/shared/ui/PressableCustom/index.tsx';
import TextCustom from '@/shared/ui/TextCustom/index.tsx';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

import { SubscriptionButtonProps } from './types.ts';

export const SubscriptionButton = ({
  title,
  price,
  pricePerMonth,
  onPress,
  isSelected,
  discount,
}: SubscriptionButtonProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    container: {
      borderColor: isSelected ? colors.errorDark : colors.gray20,
    },
    discountText: {
      backgroundColor: colors.errorDark,
    },
  });

  return (
    <PressableCustom onPress={onPress} style={styles.pressable} containerStyle={styles.wrapper}>
      <View style={[styles.container, computedStyles.container]}>
        {discount && (
          <TextCustom
            text={t('subscription.save', { amount: discount })}
            style={[styles.discountText, computedStyles.discountText]}
            textColor={colors.textLight}
          />
        )}
        <TextCustom text={title} mode={TextModes.Subtitle} style={styles.text} />

        <TextCustom numberOfLines={1} adjustsFontSizeToFit text={price} mode={TextModes.Xl} style={styles.text} />
        {pricePerMonth && (
          <TextCustom
            numberOfLines={1}
            adjustsFontSizeToFit
            text={t('subscription.month', { price: pricePerMonth })}
            style={styles.text}
            textColor={colors.textSecondary}
          />
        )}

        {isSelected && <CheckmarkIcon fill={colors.errorDark} style={styles.checkmark} />}
      </View>
    </PressableCustom>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  pressable: {
    paddingTop: SPACING.s,
  },
  container: {
    borderWidth: 1,
    borderRadius: RADIUS.small,
    paddingHorizontal: SPACING.xs,
    paddingBottom: SPACING.lg,
    minHeight: 130,
    paddingTop: SPACING.m,
    justifyContent: 'space-between',
  },
  discountText: {
    borderRadius: RADIUS.small,
    paddingHorizontal: SPACING.s,
    textAlign: 'center',
    position: 'absolute',
    top: -SPACING.s,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    lineHeight: undefined,
  },
  checkmark: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});
