import { AppState } from '@/store';

export const tagsSelector = (state: AppState) => state.user.tags;
export const onboardingStepSelector = (state: AppState) => state.user.onboardingStep;
export const notificationsSelector = (state: AppState) => state.user.notifications;
export const themeSelector = (state: AppState) => state.user.theme;
export const chatsSelector = (state: AppState) => state.user.chats;
