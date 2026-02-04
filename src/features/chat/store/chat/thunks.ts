import { CHAT_ROUTE } from '@env';

import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import { getUserProfile } from '@/features/profile/store/profile/thunks.ts';
import { MessageKey } from '@/features/profile/store/profile/types.ts';
import http from '@/shared/api/http.ts';

import { Chat, deleteChatRequest, GetChatByIdRequest, GetChatByIdResponse, Message } from './types.ts';

export const chatSliceName = 'chat';

export const getAllChats = createAxiosAsyncThunk<Required<Chat>[], void>(`${chatSliceName}/getAllChats`, async () => {
  const response = await http.get(`${CHAT_ROUTE}/all`);
  return response.data;
});

export const getChatById = createAxiosAsyncThunk<GetChatByIdResponse, GetChatByIdRequest>(
  `${chatSliceName}/getChatById`,
  async ({ agentId, chatId }, { dispatch, getState }) => {
    let resolvedChatId;
    let currentProfile;

    const profile = getState().profile.profile;

    if (!chatId) {
      if (profile) {
        currentProfile = profile;
      } else {
        currentProfile = await dispatch(getUserProfile()).unwrap();
      }

      resolvedChatId = currentProfile.chats.find(chat => chat.agentId === agentId)?.chatId;
    } else {
      resolvedChatId = chatId;
    }

    const response = await http.post(
      `${CHAT_ROUTE}/`,
      { agentId },
      {
        params: { chatId: resolvedChatId },
      },
    );
    return response.data;
  },
);

export const sendMessage = createAxiosAsyncThunk<Message, string>(
  `${chatSliceName}/sendMessage`,
  async (message, { getState }) => {
    const profile = getState().profile.profile;
    const selectedChat = getState().chat.selectedChat;

    if (!profile || !selectedChat) return;

    const lastMessage: Message = {
      _id: new Date().toISOString(),
      text: message,
      createdAt: Date.now(),
      user: {
        _id: profile.email,
        avatar: profile.avatarUrl,
      },
    };

    const response = await http.put(
      `${CHAT_ROUTE}/`,
      { lastMessage, agentInfo: selectedChat.chat.agentInfo },
      {
        params: { chatId: selectedChat.chat.chatId },
      },
    );

    return response.data;
  },
);

export const deleteChat = createAxiosAsyncThunk<MessageKey, deleteChatRequest>(
  `${chatSliceName}/deleteChat`,
  async ({ chatIds }, { dispatch }) => {
    const response = await http.delete(`${CHAT_ROUTE}/`, { data: { chatIds } });
    await dispatch(getAllChats());
    return response.data;
  },
);
