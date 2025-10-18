import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';
import Toast from 'react-native-toast-message';

import { getUserProfile, profileSliceName, sendSupportMessage, updateUserProfile, uploadAvatar } from './thunks.ts';
import { ProfileState } from './types.ts';

const initialState: ProfileState = {
  profile: null,
  loading: {
    contactUs: false,
    updateProfile: false,
    uploadAvatar: false,
  },
};

const profileSlice = createSlice({
  name: profileSliceName,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //sendSupportMessage
      .addCase(sendSupportMessage.pending, state => {
        state.loading.contactUs = true;
      })
      .addCase(sendSupportMessage.fulfilled, (state, action) => {
        state.loading.contactUs = false;
        Toast.show({
          type: 'success',
          text1: i18n.t('common.success'),
          text2: i18n.t(`serverResponses.${action.payload.messageKey}`),
          position: 'bottom',
        });
      })
      .addCase(sendSupportMessage.rejected, (state, action) => {
        state.loading.contactUs = false;
        Toast.show({
          type: 'error',
          text1: i18n.t('common.error'),
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`, { amount: action.payload?.details }),
          position: 'bottom',
        });
      })

      //getUserProfile
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      //updateUserProfile
      .addCase(updateUserProfile.pending, state => {
        state.loading.updateProfile = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading.updateProfile = false;

        const { showToast } = action.meta.arg;

        if (showToast) {
          Toast.show({
            type: 'success',
            text1: i18n.t('common.success'),
            text2: i18n.t(`serverResponses.${action.payload.messageKey}`),
          });
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading.updateProfile = false;
        Toast.show({
          type: 'error',
          text1: i18n.t('common.error'),
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
        });
      })

      //uploadAvatar
      .addCase(uploadAvatar.pending, state => {
        state.loading.uploadAvatar = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading.uploadAvatar = false;
        Toast.show({
          type: 'success',
          text1: i18n.t('common.success'),
          text2: i18n.t(`serverResponses.${action.payload.messageKey}`),
        });
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading.uploadAvatar = false;
        Toast.show({
          type: 'error',
          text1: i18n.t('common.error'),
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
        });
      });
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
