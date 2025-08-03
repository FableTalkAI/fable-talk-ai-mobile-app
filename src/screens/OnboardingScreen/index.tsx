import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Button from '@/components/atoms/Button';
import TextCustom from '@/components/atoms/TextCustom';
import { AvatarStep, DateOfBirthStep, InitialStep, InterestsStep } from '@/components/molecules/onboarding';
import SafeAreaViewCustom from '@/components/molecules/SafeAreaViewCustom';
import { STEPS_TEXT_DATA } from '@/screens/OnboardingScreen/constants.ts';
import { RenderStep } from '@/screens/OnboardingScreen/types.ts';

const OnboardingScreen = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const renderStep = useMemo(() => {
    const stepsData: Record<string, RenderStep> = {
      0: {
        component: <InitialStep />,
      },
      1: {
        component: <DateOfBirthStep />,
        isDisabled: true,
      },
      2: {
        component: <AvatarStep />,
      },
      3: {
        component: <InterestsStep />,
        isDisabled: true,
      },
    };

    return stepsData[step];
  }, [step]);

  const onContinuePress = () => {
    if (step === 3) return; //  TODO: navigate to home;

    setStep(previousStep => previousStep + 1);
    //  TODO: setStep(step + 1);
  };

  return (
    <SafeAreaViewCustom>
      {step !== 0 && (
        <>
          {/*  Header */}
          <TextCustom text={t(STEPS_TEXT_DATA[step].title)} />
          <TextCustom text={t(STEPS_TEXT_DATA[step].description)} />
        </>
      )}

      <ScrollView bounces={false} contentContainerStyle={styles.scrollView}>
        {renderStep.component}
      </ScrollView>

      <Button title={t('common.continue')} isDisable={renderStep?.isDisabled} onPress={onContinuePress} />
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default OnboardingScreen;
