import { AppState } from '@/app/store';

export const bottomWindowModeSelector = (state: AppState) => state.bottomWindow.bottomWindowMode;
export const customContentSelector = (state: AppState) => state.bottomWindow.customContent;
