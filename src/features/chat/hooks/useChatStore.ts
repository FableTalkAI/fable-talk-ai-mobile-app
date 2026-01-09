import { useCallback } from 'react';

import { chatsSelector, isLoadingSelector, selectedChatSelector } from '@/features/chat/store/chat/selectors.ts';
import { getAllChats, getChatById, sendMessage } from '@/features/chat/store/chat/thunks.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useChatStore = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(isLoadingSelector);
  const chats = useAppSelector(chatsSelector);
  const selectedChat = useAppSelector(selectedChatSelector);

  const getAllChatsHandler = useCallback(async () => {
    await dispatch(getAllChats()).unwrap();
  }, [dispatch]);

  const getChatByIdHandler = useCallback(
    async (agentId: string, chatId?: string) => {
      await dispatch(getChatById({ agentId, chatId })).unwrap();
    },
    [dispatch],
  );

  const sendMessageHandler = useCallback(
    async (message: string) => {
      return await dispatch(sendMessage(message)).unwrap();
    },
    [dispatch],
  );

  return {
    isLoading,
    chats,
    selectedChat,

    getAllChatsHandler,
    getChatByIdHandler,
    sendMessageHandler,
  };
};

export default useChatStore;
