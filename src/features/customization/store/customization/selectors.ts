import { AppState } from '@/app/store';

export const isLoadingSelector = (state: AppState) => state.customization.loading;

export const avatarFramesSelector = (state: AppState) => state.customization.avatarFrames;
export const chatBackgroundSelector = (state: AppState) => state.customization.chatBackground;
export const userAvatarFrameSelector = (state: AppState) => state.customization.userAvatarFrame;
