import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { User } from '@/features/profile/store/profile/types.ts';
import { showToast } from '@/shared/lib/toast/index.ts';

import { chatSliceName, deleteChat, getAllChats, getChatById, sendMessage } from './thunks.ts';
import { Chat, ChatState, Message, SendMessageRequest, UpdateChatListLastMessage } from './types.ts';

export const chatPersistConfig = {
  key: chatSliceName,
  storage: AsyncStorage,
  whitelist: ['chatsEntities'],
};

const initialState: ChatState = {
  chats: [],
  chatsEntities: {},
  selectedChatId: null,
  loading: {
    chats: false,
    deleteChat: false,
  },
};

const chatSlice = createSlice({
  name: chatSliceName,
  initialState,
  reducers: {
    setSelectedChatId: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
    addUserMessage: (state, action: PayloadAction<SendMessageRequest & User>) => {
      const { message, agentId, ...profile } = action.payload;
      const id = agentId;

      const userMessage: Message = {
        _id: new Date().toISOString(),
        text: message,
        createdAt: Date.now(),
        user: {
          _id: profile.email,
          avatar: profile.avatarUrl,
        },
      };

      if (state.chatsEntities[id]) {
        state.chatsEntities[id].messageHistory.unshift(userMessage);
      }
    },
    updateChatListLastMessage: (state, action: PayloadAction<UpdateChatListLastMessage>) => {
      const { agentId, message } = action.payload;
      const chat = state.chats.find(c => c.agentInfo.id === agentId);

      if (chat) {
        chat.lastMessage = message;

        const chatIndex = state.chats.indexOf(chat);
        if (chatIndex > 0) {
          state.chats.splice(chatIndex, 1);
          state.chats.unshift(chat);
        }
      }
    },
    addNewChatToList: (state, action: PayloadAction<Required<Chat>>) => {
      state.chats.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      //getAllChats
      .addCase(getAllChats.pending, state => {
        state.loading.chats = true;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.loading.chats = false;
        state.chats = action.payload;
      })
      .addCase(getAllChats.rejected, state => {
        state.loading.chats = false;
      })

      //getChatById
      .addCase(getChatById.pending, (state, action) => {
        const { agentId, cursor } = action.meta.arg;
        if (!state.chatsEntities[agentId]) {
          state.chatsEntities[agentId] = {
            messageHistory: [],
            isLoading: true,
            isLoadingMore: false,
            isSending: false,
            error: null,
            nextCursor: null,
            hasMore: true,
          };
        }

        if (cursor) {
          state.chatsEntities[agentId].isLoadingMore = true;
        } else {
          state.chatsEntities[agentId].isLoading = true;
        }
      })
      .addCase(getChatById.fulfilled, (state, action) => {
        const { agentId, cursor } = action.meta.arg;
        const chat = state.chatsEntities[agentId];

        if (cursor) {
          chat.isLoadingMore = false;
          chat.messageHistory = [...chat.messageHistory, ...action.payload.messageHistory];
          chat.nextCursor = action.payload.nextCursor;
          chat.hasMore = action.payload.hasMore;
        } else {
          chat.isLoading = false;
          if (chat.messageHistory[0]?._id !== action.payload.messageHistory[0]?._id) {
            chat.messageHistory = action.payload.messageHistory;
          }
          chat.hasMore = action.payload.hasMore;
        }

        state.chatsEntities[agentId].chat = action.payload.chat;
      })
      .addCase(getChatById.rejected, (state, action) => {
        const { agentId, cursor } = action.meta.arg;
        if (state.chatsEntities[agentId]) {
          state.chatsEntities[agentId].isLoading = false;

          if (cursor) {
            state.chatsEntities[agentId].isLoadingMore = false;
          } else {
            state.chatsEntities[agentId].isLoading = false;
          }
        }
      })

      //sendMessage
      .addCase(sendMessage.pending, (state, action) => {
        const id = action.meta.arg.agentId;
        if (state.chatsEntities[id]) state.chatsEntities[id].isSending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const id = action.meta.arg.agentId;
        const { limits, ...answer } = action.payload;

        if (limits) {
          const remainingMessages = limits?.limit - limits?.count;

          if (remainingMessages === 5 || remainingMessages === 1) {
            showToast({
              visibilityTime: 5000,
              type: 'warning',
              text2: i18n.t('chat.remainingMessages', { count: remainingMessages }),
            });
          }
        }

        if (state.chatsEntities[id]) {
          state.chatsEntities[id].isSending = false;
          if (state.chatsEntities[id].messageHistory.length > 2) {
            state.chatsEntities[id].messageHistory.unshift(answer);
          }
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const id = action.meta.arg.agentId;
        if (state.chatsEntities[id]) state.chatsEntities[id].isSending = false;
      })

      //deleteChat
      .addCase(deleteChat.pending, state => {
        state.loading.deleteChat = true;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        const idsToRemove = action.meta.arg.chatIds;

        idsToRemove.forEach(id => {
          if (state.chatsEntities[id]) delete state.chatsEntities[id];

          const chatObj = state.chats.find(c => c.chatId === id);
          if (chatObj?.agentInfo.id && state.chatsEntities[chatObj.agentInfo.id]) {
            delete state.chatsEntities[chatObj.agentInfo.id];
          }
        });

        state.chats = state.chats.filter(chat => !idsToRemove.includes(chat.chatId));

        state.loading.deleteChat = false;
        showToast({
          type: 'success',
          text2: i18n.t(`serverResponses.${action.payload.messageKey}`, { count: idsToRemove.length }),
        });
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.loading.deleteChat = false;
        showToast({
          type: 'error',
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
        });
      });
  },
});

export const { setSelectedChatId, addUserMessage, updateChatListLastMessage, addNewChatToList } = chatSlice.actions;
export default chatSlice.reducer;
