import { AppState } from '@/app/store';

export const onboardingStepSelector = (state: AppState) => state.user.onboardingStep;
export const filterSelector = (state: AppState) => state.user.filter;
export const notificationsSelector = (state: AppState) => state.user.notifications;
export const themeSelector = (state: AppState) => state.user.theme;
export const pinnedChatIdsSelector = (state: AppState) => state.user.pinnedChatIds;
