import { useMemo } from 'react';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { AvatarStep, InterestsStep } from '@/features/onboarding/ui/steps';
import DateOfBirthStep from '@/features/onboarding/ui/steps/DateOfBirthStep.tsx';
import InitialStep from '@/features/onboarding/ui/steps/InitialStep.tsx';
import UserNameStep from '@/features/onboarding/ui/steps/UserNameStep.tsx';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useUserStore from '@/features/profile/hooks/useUserStore.ts';

const useOnboardingSteps = () => {
  const { navigation } = useNavigationRoutes();
  const { setOnboardingStepIndexHandler, onboardingStepIndex, filter } = useUserStore();

  const { profile, updateUserProfileHandler, isLoading: isLoadingProfile } = useProfileStore();
  const { getAgentsHandler, isLoading: isLoadingAgents } = useAgentsStore();

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
        isDisabled: filter.tags.length !== 2,
      },
    ],
    [profile, filter.tags.length],
  );

  const lastStep = stepsData.length - 1;
  const currentStep = stepsData[onboardingStepIndex] ?? stepsData[0];
  const nextStep = stepsData[onboardingStepIndex + 1] ?? stepsData[lastStep];
  const previousStep = stepsData[onboardingStepIndex - 1] ?? stepsData[0];
  const isOnboardingEndLoading = Boolean(
    (isLoadingProfile.updateProfile || isLoadingAgents.agents) && onboardingStepIndex !== 0,
  );

  const onContinuePress = async () => {
    if (onboardingStepIndex === lastStep) {
      await Promise.all([updateUserProfileHandler({ isOnboardingDone: true }), getAgentsHandler()]);
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

  return { currentStep, onContinuePress, onboardingStepIndex, onBack, isOnboardingEndLoading };
};

export default useOnboardingSteps;
