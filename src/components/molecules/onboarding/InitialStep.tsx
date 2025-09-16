import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { OnboardingRobotIcon } from '@/assets/icons';
import TextCustom from '@/components/atoms/TextCustom';
import { TextModes } from '@/components/atoms/TextCustom/types.ts';
import { SPACING } from '@/core/constants/sizes.ts';

const InitialStep = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <OnboardingRobotIcon width={SCREEN_WIDTH} />

      <TextCustom text={t('onboarding.initialText')} mode={TextModes.Title} style={styles.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xl,
  },
  text: {
    textAlign: 'center',
  },
});

export default InitialStep;
