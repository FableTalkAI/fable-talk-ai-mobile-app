import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatGPTLogo } from '@/assets/images';

import { userSliceName } from './thunks.ts';
import { Chat, Theme, UserState } from './types.ts';

const initialState: UserState = {
  tags: [],
  onboardingStep: 0,
  isOnboardingDone: false,
  theme: Theme.System,
  notifications: {
    push: false,
  },
  chats: [
    {
      agentName: 'ChatGPT',
      agentAvatar: ChatGPTLogo,
      lastMessage: 'Last message of a chat',
      isPinned: false,
    },
    {
      agentName: 'ChatGPT2',
      agentAvatar: ChatGPTLogo,
      lastMessage: 'Last message of a chat1',
      isPinned: false,
    },
  ],
};

const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setOnboardingStep: (state, action: PayloadAction<number>) => {
      state.onboardingStep = action.payload;
    },
    setIsOnboardingDone: (state, action: PayloadAction<boolean>) => {
      state.isOnboardingDone = action.payload;
    },
    setPushNotification: (state, action: PayloadAction<boolean>) => {
      state.notifications.push = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
  },
});

export const { setTags, setOnboardingStep, setPushNotification, setTheme, setChats, setIsOnboardingDone } =
  userSlice.actions;

export default userSlice.reducer;
