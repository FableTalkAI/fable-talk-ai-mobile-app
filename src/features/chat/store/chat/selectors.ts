import { AppState } from '@/app/store';

export const isLoadingSelector = (state: AppState) => state.chat.loading;
export const chatsSelector = (state: AppState) => state.chat.chats;
export const selectedChatSelector = (state: AppState) => state.chat.selectedChat;
export const multiSelectionsChatIdsSelector = (state: AppState) => state.chat.multiSelectionsChatIds;
