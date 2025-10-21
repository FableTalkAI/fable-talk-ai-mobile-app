import { useMemo } from 'react';

import DateOfBirthStep from '@/components/molecules/onboarding/DateOfBirthStep.tsx';
import { AvatarStep, InterestsStep } from '@/components/molecules/onboarding/index.ts';
import InitialStep from '@/components/molecules/onboarding/InitialStep.tsx';
import UserNameStep from '@/components/molecules/onboarding/UserNameStep.tsx';
import useNavigationRoutes from '@/hooks/useNavigationRoutes/index.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
import useUserStore from '@/hooks/useUserStore.ts';

const useOnboardingSteps = () => {
  const { navigation } = useNavigationRoutes();
  const { setOnboardingStepIndexHandler, onboardingStepIndex, tags } = useUserStore();

  const { profile, updateUserProfileHandler } = useProfileStore();

  const stepsData = useMemo(
    () => [
      {
        component: InitialStep,
      },
      {
        component: UserNameStep,
        skip: !!profile && !!profile.name,
        isDisabled: !!profile && !profile.name,
      },
      {
        component: DateOfBirthStep,
        isDisabled: !!profile && !profile.dateOfBirth?.length,
      },
      {
        component: AvatarStep,
      },
      {
        component: InterestsStep,
        isDisabled: tags.length !== 2,
      },
    ],
    [profile, tags.length],
  );

  const lastStep = stepsData.length - 1;
  const currentStep = stepsData[onboardingStepIndex] ?? stepsData[0];
  const nextStep = stepsData[onboardingStepIndex + 1] ?? stepsData[lastStep];
  const previousStep = stepsData[onboardingStepIndex - 1] ?? stepsData[0];

  const onContinuePress = async () => {
    if (onboardingStepIndex === lastStep) {
      await updateUserProfileHandler({ isOnboardingDone: true });
      return navigation.reset({
        index: 0,
        routes: [{ name: 'TabBarNavigator', params: { screen: 'Home' } }],
      });
    }
    const stepSize = nextStep.skip ? 2 : 1;
    const forwardStep = onboardingStepIndex + stepSize > lastStep ? lastStep : onboardingStepIndex + stepSize;
    setOnboardingStepIndexHandler(forwardStep);
  };

  const onBack = () => {
    if (onboardingStepIndex === 0) return;
    const stepSize = previousStep.skip ? 2 : 1;
    const backStep = onboardingStepIndex - stepSize < 0 ? 0 : onboardingStepIndex - stepSize;
    setOnboardingStepIndexHandler(backStep);
  };

  return { currentStep, onContinuePress, onboardingStepIndex, onBack };
};

export default useOnboardingSteps;
