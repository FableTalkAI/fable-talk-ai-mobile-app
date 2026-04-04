import { AppState } from '@/app/store';

// BottomWindow
export const bottomWindowIsLockedSelector = (state: AppState) => state.overlay.bottomWindow.isLocked;
export const bottomWindowCustomContentSelector = (state: AppState) => state.overlay.bottomWindow.customContent;

// Modal
export const modalCustomContentSelector = (state: AppState) => state.overlay.modal.customContent;
