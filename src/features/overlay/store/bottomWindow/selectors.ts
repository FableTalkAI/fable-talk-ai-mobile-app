import { AppState } from '@/app/store';

export const isLockedSelector = (state: AppState) => state.bottomWindow.isLocked;
export const customContentSelector = (state: AppState) => state.bottomWindow.customContent;
