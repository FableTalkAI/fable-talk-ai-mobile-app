import { CHAT_ROUTE } from '@env';

import defaultAxiosInstance from '@/api/defaultAxiosInstance.ts';
import { createAxiosAsyncThunk } from '@/core/redux/typedCreateAsyncThunk.ts';

import { Chat, GetChatByIdRequest, GetChatByIdResponse, Message } from './types.ts';

export const chatSliceName = 'chat';

export const getAllChats = createAxiosAsyncThunk<Chat[], void>(`${chatSliceName}/getAllChats`, async () => {
  const response = await defaultAxiosInstance.get(`${CHAT_ROUTE}/all`);
  return response.data;
});

export const getChatById = createAxiosAsyncThunk<GetChatByIdResponse, GetChatByIdRequest>(
  `${chatSliceName}/getChatById`,
  async ({ agentId }, { getState }) => {
    const profile = getState().profile.profile;

    if (!profile) return;

    const chatId = profile.chats.find(chat => chat.agentId === agentId)?.chatId;

    const response = await defaultAxiosInstance.post(
      `${CHAT_ROUTE}/`,
      { agentId },
      {
        params: { chatId },
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
      },
    };

    const response = await defaultAxiosInstance.put(
      `${CHAT_ROUTE}/`,
      { lastMessage, agentInfo: selectedChat.chat.agentInfo },
      {
        params: { chatId: selectedChat.chat.chatId },
      },
    );

    return response.data;
  },
);
