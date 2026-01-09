import { StepTextData } from './types.ts';

const STEPS_TEXT_DATA: Record<number, StepTextData> = {
  1: {
    title: 'common.yourName',
    description: 'onboarding.description.name',
  },
  2: {
    title: 'common.dateOfBirth',
    description: 'onboarding.description.dateOfBirth',
  },
  3: {
    title: 'common.avatar',
    description: 'onboarding.description.avatar',
  },
  4: {
    title: 'common.interests',
    description: 'onboarding.description.interests',
  },
};

export { STEPS_TEXT_DATA };
