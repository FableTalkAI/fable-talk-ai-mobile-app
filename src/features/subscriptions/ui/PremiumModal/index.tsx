import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes/index.ts';
import ModalCustom from '@/features/overlay/ui/ModalCustom/index.tsx';
import { RocketIcon } from '@/shared/assets/icons/index.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button/index.tsx';
import { ButtonModes } from '@/shared/ui/Button/types.ts';

import { PremiumModalProps } from './types.ts';

const PremiumModal = ({ withAds, titleKey }: PremiumModalProps) => {
  const { navigation } = useNavigationRoutes();
  const { t } = useTranslation();

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
        {/*TODO: adds handling*/}
        {withAds && (
          <Button
            title={t('modal.premium.adsButton')}
            containerStyle={styles.button}
            numberOfLines={1}
            withExitingAnimation={false}
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
