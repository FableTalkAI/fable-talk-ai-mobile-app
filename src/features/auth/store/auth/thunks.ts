import { AUTH_ROUTE } from '@env';
import auth from '@react-native-firebase/auth';

import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import { getUserProfile } from '@/features/profile/store/profile/thunks.ts';
import http from '@/shared/api/http.ts';

import { SendOtpRequest, UpsertGoogleRequest, VerifyOtpRequest } from './types.ts';

export const authSliceName = 'auth';

export const sendOtp = createAxiosAsyncThunk<void, SendOtpRequest>(`${authSliceName}/sendOtp`, async data => {
  await http.post(`${AUTH_ROUTE}/send-otp`, data);
});

export const verifyOtp = createAxiosAsyncThunk<void, VerifyOtpRequest>(
  `${authSliceName}/verifyOtp`,
  async (data, { dispatch }) => {
    const response = await http.post(`${AUTH_ROUTE}/verify`, data);

    await auth().signInWithCustomToken(response.data);
    auth().onAuthStateChanged(async user => {
      if (user) {
        await dispatch(getUserProfile());
      }
    });
  },
);

export const upsertGoogle = createAxiosAsyncThunk<void, UpsertGoogleRequest>(
  `${authSliceName}/upsertGoogle`,
  async ({ data, credential }, { dispatch }) => {
    await http.post(`${AUTH_ROUTE}/google`, data);

    await auth().signInWithCredential(credential);
    await dispatch(getUserProfile());
  },
);
