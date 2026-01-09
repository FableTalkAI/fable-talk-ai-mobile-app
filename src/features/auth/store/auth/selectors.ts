import { AppState } from '@/app/store';

export const isLoadingSelector = (state: AppState) => state.auth.loading;
export const verifyDataSelector = (state: AppState) => state.auth.verifyData;
export const isLoggedInSelector = (state: AppState) => state.auth.isLoggedIn;
