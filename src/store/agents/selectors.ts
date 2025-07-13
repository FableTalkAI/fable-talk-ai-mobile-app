import { AppState } from '@/store';

export const amountSelector = (state: AppState) => state.agents.amount;
