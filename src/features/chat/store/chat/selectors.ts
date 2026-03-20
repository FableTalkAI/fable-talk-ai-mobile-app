import { AppState } from '@/app/store';

export const isLoadingSelector = (state: AppState) => state.chat.loading;
export const chatsSelector = (state: AppState) => state.chat.chats;
export const chatEntitySelector = (state: AppState) => {
  const id = state.chat.selectedChatId;
  return id ? state.chat.chatsEntities[id] || null : null;
};
