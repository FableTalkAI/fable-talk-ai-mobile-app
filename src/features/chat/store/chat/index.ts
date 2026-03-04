import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { showToast } from '@/shared/lib/toast/index.ts';

import { chatSliceName, deleteChat, getAllChats, getChatById, sendMessage } from './thunks.ts';
import { ChatState } from './types.ts';

const initialState: ChatState = {
  chats: [],
  selectedChat: null,
  loading: {
    sendMessage: false,
    chats: false,
    selectedChat: false,
    deleteChat: false,
  },
};

const chatSlice = createSlice({
  name: chatSliceName,
  initialState,
  reducers: {},
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
      .addCase(getChatById.pending, state => {
        state.loading.selectedChat = true;
      })
      .addCase(getChatById.fulfilled, (state, action) => {
        state.loading.selectedChat = false;
        state.selectedChat = {
          chat: action.payload.chat,
          messageHistory: action.payload.messageHistory.reverse(),
        };
      })
      .addCase(getChatById.rejected, state => {
        state.loading.selectedChat = false;
      })

      //sendMessage
      .addCase(sendMessage.pending, state => {
        state.loading.sendMessage = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading.sendMessage = false;
        const { limits, ...rest } = action.payload;

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

        if (!state.selectedChat) return;
        state.selectedChat.messageHistory = [...state.selectedChat.messageHistory, rest];
      })
      .addCase(sendMessage.rejected, state => {
        state.loading.sendMessage = false;
      })

      //deleteChat
      .addCase(deleteChat.pending, state => {
        state.loading.deleteChat = true;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.loading.deleteChat = false;
        showToast({
          type: 'success',
          text2: i18n.t(`serverResponses.${action.payload.messageKey}`),
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

export default chatSlice.reducer;
