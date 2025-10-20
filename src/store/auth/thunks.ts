import { AUTH_ROUTE } from '@env';
import auth from '@react-native-firebase/auth';

import defaultAxiosInstance from '@/api/defaultAxiosInstance.ts';
import { createAxiosAsyncThunk } from '@/core/redux/typedCreateAsyncThunk.ts';
import { getUserProfile } from '@/store/profile/thunks.ts';

import { SendOtpRequest, UpsertGoogleRequest, VerifyOtpRequest } from './types.ts';

export const authSliceName = 'auth';

export const sendOtp = createAxiosAsyncThunk<void, SendOtpRequest>(`${authSliceName}/sendOtp`, async data => {
  await defaultAxiosInstance.post(`${AUTH_ROUTE}/send-otp`, data);
});

export const verifyOtp = createAxiosAsyncThunk<void, VerifyOtpRequest>(
  `${authSliceName}/verifyOtp`,
  async (data, { dispatch }) => {
    const response = await defaultAxiosInstance.post(`${AUTH_ROUTE}/verify`, data);

    await auth().signInWithCustomToken(response.data);
    await dispatch(getUserProfile());
  },
);

export const upsertGoogle = createAxiosAsyncThunk<void, UpsertGoogleRequest>(
  `${authSliceName}/upsertGoogle`,
  async ({ data, credential }, { dispatch }) => {
    await defaultAxiosInstance.post(`${AUTH_ROUTE}/google`, data);

    await auth().signInWithCredential(credential);
    await dispatch(getUserProfile());
  },
);
