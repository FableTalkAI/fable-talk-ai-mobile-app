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
        if (!state.selectedChat) return;

        state.selectedChat.messageHistory = [...state.selectedChat.messageHistory, action.payload];
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
          position: 'bottom',
        });
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.loading.deleteChat = false;
        showToast({
          type: 'error',
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
          position: 'bottom',
        });
      });
  },
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
