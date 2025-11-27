import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { showToast } from '@/core/utils/toast';

import { userSliceName } from './thunks.ts';
import { SortByFilter, SortFilter, Theme, UserState } from './types.ts';

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
  pinnedChatIds: [],
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
    updatePinnedChatIds: (state, action: PayloadAction<string>) => {
      if (state.pinnedChatIds.includes(action.payload)) {
        state.pinnedChatIds = state.pinnedChatIds.filter(i => i !== action.payload);
        return;
      }

      if (state.pinnedChatIds.length === 2) {
        showToast({
          type: 'error',
          text2: i18n.t(`common.pinnedWarning`),
        });
        return;
      }

      state.pinnedChatIds.push(action.payload);
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
  updatePinnedChatIds,
} = userSlice.actions;

export default userSlice.reducer;
