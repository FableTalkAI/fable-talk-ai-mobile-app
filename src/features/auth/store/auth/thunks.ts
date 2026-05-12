import { AUTH_ROUTE } from '@env';
import auth from '@react-native-firebase/auth';

import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import { getUserProfile } from '@/features/profile/store/profile/thunks.ts';
import { User } from '@/features/profile/store/profile/types.ts';
import http from '@/shared/api/http.ts';

import { SendOtpRequest, UpsertThirdPartyRequest, VerifyOtpRequest } from './types.ts';

export const authSliceName = 'auth';

export const sendOtp = createAxiosAsyncThunk<void, SendOtpRequest>(`${authSliceName}/sendOtp`, async data => {
  await http.post(`${AUTH_ROUTE}/send-otp`, data);
});

export const verifyOtp = createAxiosAsyncThunk<User, VerifyOtpRequest>(
  `${authSliceName}/verifyOtp`,
  async (data, { dispatch }) => {
    const response = await http.post(`${AUTH_ROUTE}/verify`, data);

    await auth().signInWithCustomToken(response.data);
    return new Promise<User>((resolve, reject) => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (!user) return;
        dispatch(getUserProfile()).unwrap().then(resolve).catch(reject).finally(unsubscribe);
      });

      setTimeout(() => reject(new Error('Firebase onAuthStateChanged timeout')), 10000);
    });
  },
);

export const upsertThirdParty = createAxiosAsyncThunk<User, UpsertThirdPartyRequest>(
  `${authSliceName}/upsertThirdParty`,
  async ({ data, credential }, { dispatch }) => {
    await http.post(`${AUTH_ROUTE}/third-party`, data);

    await auth().signInWithCredential(credential);
    return await dispatch(getUserProfile()).unwrap();
  },
);
