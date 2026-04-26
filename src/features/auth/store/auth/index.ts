import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from 'i18next';

import { showToast } from '@/features/overlay/services/showToast.ts';

import { authSliceName, sendOtp, upsertThirdParty, verifyOtp } from './thunks.ts';
import { AuthState, VerifyData } from './types.ts';

const initialState: AuthState = {
  verifyData: null,
  isLoggedIn: false,
  loading: {
    verifyOtp: false,
    login: false,
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
        state.loading.login = true;
      })
      .addCase(sendOtp.fulfilled, state => {
        state.loading.login = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading.login = false;
        showToast({
          type: 'error',
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
        showToast({
          type: 'error',
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`, { amount: action.payload?.remainingAttempts }),
        });
      })

      //upsertThirdParty
      .addCase(upsertThirdParty.pending, state => {
        state.loading.login = true;
      })
      .addCase(upsertThirdParty.fulfilled, state => {
        state.loading.login = false;
      })
      .addCase(upsertThirdParty.rejected, (state, action) => {
        state.loading.login = false;
        showToast({
          type: 'error',
          text2: i18n.t(`serverResponses.${action.payload?.messageKey}`),
        });
      });
  },
});

export const { setVerifyData, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
