import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useSubscription from '@/features/subscriptions/hooks/useSubscription';
import useTheme from '@/shared/hooks/useTheme.ts';
import { RADIUS, SPACING } from '@/shared/model/sizes.ts';
import { BOX_SHADOW } from '@/shared/model/styles.ts';
import TextCustom from '@/shared/ui/TextCustom';
import { TextModes } from '@/shared/ui/TextCustom/types.ts';

const ActiveSubscriptionBar = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { isPremium } = useSubscription();

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundBase,
    },
  });

  return (
    <View style={[styles.container, computedStyles.container]}>
      <TextCustom text={t('subscription.activeSubscriptionStatus')} />
      <TextCustom
        text={isPremium ? 'PREMIUM' : 'FREE'}
        mode={TextModes.Title}
        textColor={isPremium ? colors.successBase : colors.gray40}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: SPACING.s,
    borderRadius: RADIUS.medium,
    boxShadow: BOX_SHADOW.base,
  },
});

export default ActiveSubscriptionBar;
