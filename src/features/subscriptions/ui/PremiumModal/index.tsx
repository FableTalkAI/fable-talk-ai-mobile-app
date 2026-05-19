import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useAdRewarded from '@/features/ads/hooks/useAdRewarded';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes/index.ts';
import useModal from '@/features/overlay/hooks/useModal.ts';
import { showToast } from '@/features/overlay/services/showToast.ts';
import ModalCustom from '@/features/overlay/ui/ModalCustom/index.tsx';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { RocketIcon } from '@/shared/assets/icons/index.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button/index.tsx';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { PremiumModalProps } from './types.ts';

const PremiumModal = ({ withAds, titleKey }: PremiumModalProps) => {
  const { navigation } = useNavigationRoutes();
  const { t } = useTranslation();

  const { closeModal } = useModal();

  const { setLimitsCountHandler } = useProfileStore();
  const { showRewardedAd } = useAdRewarded({
    onRewardEarned: () => setLimitsCountHandler(5, 'decrement'),
    onClosed: () => {
      closeModal();
      showToast({
        type: 'success',
        text2: t('modal.premium.successToast'),
      });
    },
  });

  const subscriptionNavigationHandling = () => navigation.navigate('Subscriptions');

  const description = useMemo(() => {
    if (withAds) {
      return t('modal.premium.description') + '\n' + t('modal.premium.adsDescription');
    }

    return t('modal.premium.description');
  }, [t, withAds]);

  return (
    <ModalCustom title={t(`modal.premium.title.${titleKey}`)} description={description}>
      <View style={styles.buttonContainer}>
        <RocketIcon style={{ marginVertical: SPACING.xs }} />

        {withAds && (
          <Button
            title={t('modal.premium.adsButton')}
            containerStyle={styles.button}
            numberOfLines={1}
            withExitingAnimation={false}
            onPress={showRewardedAd}
          />
        )}

        <Button
          withExitingAnimation={false}
          title={t('modal.premium.premiumButton')}
          mode={ButtonModes.Link}
          containerStyle={styles.button}
          numberOfLines={1}
          onPress={subscriptionNavigationHandling}
        />
      </View>
    </ModalCustom>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    gap: SPACING.xs,
  },
  button: {
    flexShrink: 1,
    width: '100%',
  },
});

export default PremiumModal;
