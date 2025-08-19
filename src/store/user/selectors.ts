import { AppState } from '@/store';

export const tagsSelector = (state: AppState) => state.user.tags;
export const profileSelector = (state: AppState) => state.user.profile;
export const onboardingStepSelector = (state: AppState) => state.user.onboardingStep;
