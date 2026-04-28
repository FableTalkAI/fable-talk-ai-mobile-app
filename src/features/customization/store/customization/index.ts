import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { customizationSliceName, getAvatarFrames } from './thunks.ts';
import { CustomizationState } from './types.ts';

const initialState: CustomizationState = {
  avatarFrames: null,
  userAvatarFrame: null,
  loading: {
    avatarFrames: false,
  },
};

const customizationSlice = createSlice({
  name: customizationSliceName,
  initialState,
  reducers: {
    setUserAvatarFrame: (state, action: PayloadAction<CustomizationState['userAvatarFrame']>) => {
      state.userAvatarFrame = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      //getAvatarFrames getAvatarFrames
      .addCase(getAvatarFrames.pending, state => {
        state.loading.avatarFrames = true;
      })
      .addCase(getAvatarFrames.fulfilled, (state, action) => {
        state.loading.avatarFrames = false;
        state.avatarFrames = action.payload;
      })
      .addCase(getAvatarFrames.rejected, state => {
        state.loading.avatarFrames = false;
      });
  },
});

export const { setUserAvatarFrame } = customizationSlice.actions;

export default customizationSlice.reducer;
