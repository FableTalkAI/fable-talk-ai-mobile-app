import { AppState } from '@/app/store';

export const bottomWindowModeSelector = (state: AppState) => state.bottomWindow.bottomWindowMode;
