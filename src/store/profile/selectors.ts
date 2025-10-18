import { AppState } from '@/store';

export const isLoadingSelector = (state: AppState) => state.profile.loading;
export const profileSelector = (state: AppState) => state.profile.profile;
