import { AppState } from '@/store';

export const isLoadingSelector = (state: AppState) => state.profile.loading;
