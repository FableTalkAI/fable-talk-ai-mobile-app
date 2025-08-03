import { StepTextData } from '@/screens/OnboardingScreen/types.ts';

const STEPS_TEXT_DATA: Record<number, StepTextData> = {
  1: {
    title: 'common.dateOfBirth',
    description: 'onboarding.description.dateOfBirth',
  },
  2: {
    title: 'common.avatar',
    description: 'onboarding.description.avatar',
  },
  3: {
    title: 'common.interests',
    description: 'onboarding.description.interests',
  },
};

export { STEPS_TEXT_DATA };
