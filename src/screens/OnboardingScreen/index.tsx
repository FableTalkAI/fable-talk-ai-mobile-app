import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import Header from '@/components/molecules/Header';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { SPACING } from '@/core/constants/sizes.ts';

import { STEPS_TEXT_DATA } from './constants.ts';
import useOnboardingSteps from './hooks/useOnboardingSteps.ts';

const OnboardingScreen = () => {
  const { t } = useTranslation();

  const { currentStep, onContinuePress, onboardingStepIndex, onBack } = useOnboardingSteps();

  const CurrentStep = currentStep.component;

  return (
    <SafeAreaViewCustom>
      <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut} key={`header-${onboardingStepIndex}`}>
        {onboardingStepIndex !== 0 && (
          <>
            <Header title={t(STEPS_TEXT_DATA[onboardingStepIndex].title)} onPress={onBack} />
            <TextCustom style={styles.subtitle} text={t(STEPS_TEXT_DATA[onboardingStepIndex].description)} />
          </>
        )}

        <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContainer}>
          <CurrentStep />
        </ScrollView>
      </Animated.View>

      <Button title={t('actions.continue')} isDisable={currentStep?.isDisabled} onPress={onContinuePress} />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginVertical: SPACING.m,
  },
  subtitle: {
    marginBottom: SPACING.xl,
  },
});

export default OnboardingScreen;
