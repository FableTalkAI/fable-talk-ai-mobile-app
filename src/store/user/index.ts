import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatGPTLogo } from '@/assets/images';

import { userSliceName } from './thunks.ts';
import { Chat, SortByFilter, SortFilter, Theme, UserState } from './types.ts';

const initialState: UserState = {
  onboardingStep: 0,
  filter: {
    tags: [],
    sortBy: SortByFilter.DateAdded,
    sort: SortFilter.ASC,
  },
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
    setFilterTags: (state, action: PayloadAction<string[]>) => {
      state.filter.tags = action.payload;
    },
    setFilterSortBy: (state, action: PayloadAction<SortByFilter>) => {
      state.filter.sortBy = action.payload;
    },
    setFilterSort: (state, action: PayloadAction<SortFilter>) => {
      state.filter.sort = action.payload;
    },
    clearFilter: state => {
      state.filter = initialState.filter;
    },
    setOnboardingStep: (state, action: PayloadAction<number>) => {
      state.onboardingStep = action.payload;
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

export const {
  setFilterTags,
  setFilterSort,
  setFilterSortBy,
  clearFilter,
  setOnboardingStep,
  setPushNotification,
  setTheme,
  setChats,
} = userSlice.actions;

export default userSlice.reducer;
