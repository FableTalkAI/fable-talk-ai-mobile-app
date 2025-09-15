import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userSliceName } from './thunks.ts';
import { Theme, UserProfile, UserState } from './types.ts';

const initialState: UserState = {
  tags: [],
  onboardingStep: 0,
  profile: {},
  theme: Theme.System,
  notifications: {
    push: false,
    email: false,
  },
};

const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setOnboardingStep: (state, action: PayloadAction<number>) => {
      state.onboardingStep = action.payload;
    },
    setPushNotification: (state, action: PayloadAction<boolean>) => {
      state.notifications.push = action.payload;
    },
    setEmailNotification: (state, action: PayloadAction<boolean>) => {
      state.notifications.email = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTags, setProfile, setOnboardingStep, setPushNotification, setEmailNotification, setTheme } =
  userSlice.actions;

export default userSlice.reducer;
