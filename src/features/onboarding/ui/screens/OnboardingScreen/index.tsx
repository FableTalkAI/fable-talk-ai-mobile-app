import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useOnboardingSteps from '@/features/onboarding/hooks/useOnboardingSteps.ts';
import { STEPS_TEXT_DATA } from '@/features/onboarding/model/constants.ts';
import { SPACING } from '@/shared/model/sizes.ts';
import Button from '@/shared/ui/Button';
import Header from '@/shared/ui/Header';
import SafeAreaViewCustom from '@/shared/ui/SafeAreaViewCustom';
import TextCustom from '@/shared/ui/TextCustom';

const OnboardingScreen = () => {
  const { t } = useTranslation();

  const { currentStep, onContinuePress, onboardingStepIndex, onBack, isOnboardingEndLoading } = useOnboardingSteps();

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <CurrentStep />
        </ScrollView>
      </Animated.View>

      <Button
        title={t('actions.continue')}
        isLoading={isOnboardingEndLoading}
        isDisable={currentStep?.isDisabled}
        onPress={onContinuePress}
      />
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
