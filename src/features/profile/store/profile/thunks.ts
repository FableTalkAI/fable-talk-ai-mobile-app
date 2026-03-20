import { CONTACT_US_ROUTE, PROFILE_ROUTE } from '@env';

import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import http from '@/shared/api/http.ts';
import { convertImageToBase64 } from '@/shared/services/convertImageToBase64.ts';

import { MessageKey, UpdateUserProfileRequest, User, UserLimits } from './types.ts';

export const profileSliceName = 'profile';

export const sendSupportMessage = createAxiosAsyncThunk<MessageKey, string>(
  `${profileSliceName}/sendSupportMessage`,
  async message => {
    const response = await http.post(CONTACT_US_ROUTE, {
      message,
    });
    return response.data;
  },
);

export const getUserProfile = createAxiosAsyncThunk<User, void>(`${profileSliceName}/getUserProfile`, async () => {
  const response = await http.get(PROFILE_ROUTE);
  return response.data;
});

export const getUserLimits = createAxiosAsyncThunk<UserLimits, void>(`${profileSliceName}/getUserLimits`, async () => {
  const response = await http.get(`${PROFILE_ROUTE}/limits`);
  return response.data;
});

export const updateUserProfile = createAxiosAsyncThunk<MessageKey, UpdateUserProfileRequest>(
  `${profileSliceName}/updateUserProfile`,
  async ({ user }, { dispatch }) => {
    const response = await http.patch(`${PROFILE_ROUTE}/update`, {
      ...user,
    });
    await dispatch(getUserProfile());
    return response.data;
  },
);

export const uploadAvatar = createAxiosAsyncThunk<MessageKey, string>(
  `${profileSliceName}/uploadAvatar`,
  async (imgUri, { dispatch }) => {
    const avatarBase64 = await convertImageToBase64(imgUri);
    const response = await http.patch(`${PROFILE_ROUTE}/upload-avatar`, {
      avatarBase64,
    });
    await dispatch(getUserProfile());
    return response.data;
  },
);

export const deleteUserProfile = createAxiosAsyncThunk<MessageKey, void>(
  `${profileSliceName}/deleteUserProfile`,
  async () => {
    const response = await http.delete(`${PROFILE_ROUTE}`);
    return response.data;
  },
);
