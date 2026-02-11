import { AppState } from '@/app/store';

export const isLoadingSelector = (state: AppState) => state.profile.loading;
export const profileSelector = (state: AppState) => state.profile.profile;
export const limitsSelector = (state: AppState) => state.profile.limits;
