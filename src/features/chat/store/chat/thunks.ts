import { CHAT_ROUTE } from '@env';

import { AppDispatch, AppState } from '@/app/store/index.ts';
import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import { setLimits } from '@/features/profile/store/profile';
import { getUserProfile } from '@/features/profile/store/profile/thunks.ts';
import { MessageKey } from '@/features/profile/store/profile/types.ts';
import http from '@/shared/api/http.ts';

import { addNewChatToList, updateChatListLastMessage } from './index.ts';
import {
  Chat,
  deleteChatRequest,
  GetChatByIdRequest,
  GetChatByIdResponse,
  Message,
  SendMessageRequest,
  SendMessageResponse,
} from './types.ts';

export const chatSliceName = 'chat';

export const getAllChats = createAxiosAsyncThunk<Required<Chat>[], void>(`${chatSliceName}/getAllChats`, async () => {
  const response = await http.get(`${CHAT_ROUTE}/all`);
  return response.data;
});

export const getChatById = createAxiosAsyncThunk<GetChatByIdResponse, GetChatByIdRequest>(
  `${chatSliceName}/getChatById`,
  async ({ agentId, chatId, cursor, limit = 10 }, { dispatch, getState }) => {
    let resolvedChatId = chatId;

    if (!chatId) {
      const profile = getState().profile.profile || (await dispatch(getUserProfile()).unwrap());
      resolvedChatId = profile.chats.find(c => c.agentId === agentId)?.chatId;
    }

    const response = await http.post(
      `${CHAT_ROUTE}/`,
      { agentId, cursor, limit },
      {
        params: { chatId: resolvedChatId },
      },
    );

    return response.data;
  },
);

export const loadMoreMessages = (agentId: string) => async (dispatch: AppDispatch, getState: () => AppState) => {
  const entity = getState().chat.chatsEntities[agentId];

  if (!entity || entity.isLoadingMore || !entity.hasMore || !entity.nextCursor) return;

  await dispatch(
    getChatById({
      agentId,
      chatId: entity.chat?.chatId,
      cursor: entity.nextCursor,
    }),
  );
};

export const sendMessage = createAxiosAsyncThunk<SendMessageResponse, SendMessageRequest>(
  `${chatSliceName}/sendMessage`,
  async ({ message, agentId }, { getState, dispatch }) => {
    const profile = getState().profile.profile;
    const chatData = getState().chat.chatsEntities[agentId]?.chat;

    if (!profile || !chatData) return;

    const userMessage: Message = {
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
      { lastMessage: userMessage, agentInfo: chatData.agentInfo },
      {
        params: { chatId: chatData.chatId },
      },
    );

    if (response.data.limits) {
      dispatch(setLimits(response.data.limits));
    }

    if (!chatData.chatId) {
      await dispatch(getUserProfile());
      const newChat = await dispatch(getChatById({ agentId: chatData.agentInfo.id })).unwrap();
      dispatch(addNewChatToList(newChat.chat as Required<Chat>));
    }

    dispatch(updateChatListLastMessage({ agentId: chatData.agentInfo.id, message: response.data }));

    return response.data;
  },
);

export const deleteChat = createAxiosAsyncThunk<MessageKey, deleteChatRequest>(
  `${chatSliceName}/deleteChat`,
  async ({ chatIds }) => {
    const response = await http.delete(`${CHAT_ROUTE}/`, { data: { chatIds } });
    return response.data;
  },
);
