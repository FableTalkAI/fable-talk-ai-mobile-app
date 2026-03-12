import { useCallback } from 'react';

import { addUserMessage, setSelectedChatId } from '@/features/chat/store/chat';
import { chatEntitySelector, chatsSelector, isLoadingSelector } from '@/features/chat/store/chat/selectors.ts';
import { deleteChat, getAllChats, getChatById, sendMessage } from '@/features/chat/store/chat/thunks.ts';
import { SendMessageRequest } from '@/features/chat/store/chat/types.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useChatStore = () => {
  const dispatch = useAppDispatch();
  const { profile } = useProfileStore();

  const isLoading = useAppSelector(isLoadingSelector);
  const chats = useAppSelector(chatsSelector);
  const selectedChat = useAppSelector(chatEntitySelector);

  const getAllChatsHandler = useCallback(async () => {
    await dispatch(getAllChats()).unwrap();
  }, [dispatch]);

  const getChatByIdHandler = useCallback(
    async (agentId: string, chatId?: string) => {
      dispatch(setSelectedChatId(agentId));
      await dispatch(getChatById({ agentId, chatId })).unwrap();
    },
    [dispatch],
  );

  const sendMessageHandler = useCallback(
    async (data: SendMessageRequest) => {
      if (profile) {
        dispatch(addUserMessage({ ...data, ...profile }));
      }
      return await dispatch(sendMessage(data)).unwrap();
    },
    [dispatch, profile],
  );

  const deleteChatHandler = useCallback(
    async (chatIds: string[]) => {
      await dispatch(deleteChat({ chatIds })).unwrap();
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
    deleteChatHandler,
  };
};

export default useChatStore;
