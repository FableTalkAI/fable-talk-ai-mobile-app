import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';
import Toast from 'react-native-toast-message';

import { profileSliceName, sendSupportMessage } from './thunks.ts';
import { ProfileState } from './types.ts';

const initialState: ProfileState = {
  loading: {
    contactUs: false,
  },
};

const profileSlice = createSlice({
  name: profileSliceName,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendSupportMessage.pending, state => {
        state.loading.contactUs = true;
      })
      .addCase(sendSupportMessage.fulfilled, (state, action) => {
        state.loading.contactUs = false;
        Toast.show({
          type: 'success',
          text1: i18n.t('common.success'),
          text2: i18n.t(`serverResponses.${action.payload.messageKey}`),
        });
      })
      .addCase(sendSupportMessage.rejected, (state, action) => {
        state.loading.contactUs = false;
        Toast.show({
          type: 'error',
          text1: i18n.t('common.error'),
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`, { amount: action.payload?.details }),
        });
      });
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
