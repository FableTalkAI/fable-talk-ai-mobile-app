import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';
import Toast from 'react-native-toast-message';

import { authSliceName, sendOtp, upsertGoogle, verifyOtp } from './thunks.ts';
import { AuthState, VerifyData } from './types.ts';

const initialState: AuthState = {
  verifyData: null,
  isLoggedIn: false,
  loading: {
    sendOtp: false,
    verifyOtp: false,
    upsertGoogle: false,
  },
};

const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {
    setVerifyData: (state, action: PayloadAction<VerifyData>) => {
      state.verifyData = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //sendOtp
      .addCase(sendOtp.pending, state => {
        state.loading.sendOtp = true;
      })
      .addCase(sendOtp.fulfilled, state => {
        state.loading.sendOtp = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading.sendOtp = false;
        Toast.show({
          type: 'error',
          text1: i18n.t('common.error'),
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
          position: 'bottom',
        });
      })

      //verifyOtp
      .addCase(verifyOtp.pending, state => {
        state.loading.verifyOtp = true;
      })
      .addCase(verifyOtp.fulfilled, state => {
        state.loading.verifyOtp = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading.verifyOtp = false;
        Toast.show({
          type: 'error',
          text1: i18n.t('common.error'),
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`, { amount: action.payload?.remainingAttempts }),
        });
      })

      //upsertGoogle
      .addCase(upsertGoogle.pending, state => {
        state.loading.upsertGoogle = true;
      })
      .addCase(upsertGoogle.fulfilled, state => {
        state.loading.upsertGoogle = false;
      })
      .addCase(upsertGoogle.rejected, (state, action) => {
        state.loading.upsertGoogle = false;
        Toast.show({
          type: 'error',
          text1: i18n.t('common.error'),
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
        });
      });
  },
});

export const { setVerifyData, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
