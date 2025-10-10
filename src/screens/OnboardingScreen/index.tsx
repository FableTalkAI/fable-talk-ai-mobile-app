import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import Header from '@/components/molecules/Header';
import { AvatarStep, DateOfBirthStep, InitialStep, InterestsStep } from '@/components/molecules/onboarding';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { SPACING } from '@/core/constants/sizes.ts';
import useNavigationRoutes from '@/hooks/useNavigationRoutes';
import useUserStore from '@/hooks/useUserStore.ts';

import { STEPS_TEXT_DATA } from './constants.ts';

const OnboardingScreen = () => {
  const { t } = useTranslation();
  const { navigation } = useNavigationRoutes();

  const { tags, profile, setOnboardingStepHandler, onboardingStep, setIsOnboardingDoneHandler } = useUserStore();

  const { renderStep, lastStep } = useMemo(() => {
    const stepsData = [
      {
        component: <InitialStep />,
      },
      {
        component: <DateOfBirthStep />,
        isDisabled: !profile.dateOfBirth?.length,
      },
      {
        component: <AvatarStep />,
      },
      {
        component: <InterestsStep />,
        isDisabled: tags.length !== 2,
      },
    ];

    return {
      renderStep: stepsData[onboardingStep],
      lastStep: stepsData.length - 1,
    };
  }, [onboardingStep, tags, profile]);

  const onContinuePress = () => {
    if (onboardingStep === lastStep) {
      setIsOnboardingDoneHandler(true);
      return navigation.reset({
        index: 0,
        routes: [{ name: 'TabBarNavigator', params: { screen: 'Home' } }],
      });
    }
    setOnboardingStepHandler(onboardingStep + 1);
  };

  return (
    <SafeAreaViewCustom>
      <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut} key={`header-${onboardingStep}`}>
        {onboardingStep !== 0 && (
          <>
            <Header
              title={t(STEPS_TEXT_DATA[onboardingStep].title)}
              onPress={() => setOnboardingStepHandler(onboardingStep - 1)}
            />
            <TextCustom style={styles.subtitle} text={t(STEPS_TEXT_DATA[onboardingStep].description)} />
          </>
        )}

        <ScrollView bounces={false} contentContainerStyle={styles.scrollViewContainer}>
          {renderStep.component}
        </ScrollView>
      </Animated.View>

      <Button title={t('actions.continue')} isDisable={renderStep?.isDisabled} onPress={onContinuePress} />
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
