import { AppState } from '@/app/store';

export const customerInfoSelector = (state: AppState) => state.subscription.customerInfo;
export const packagesSelector = (state: AppState) => state.subscription.packages;
