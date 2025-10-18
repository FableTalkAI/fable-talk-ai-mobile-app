import { CONTACT_US_ROUTE, PROFILE_ROUTE } from '@env';

import defaultAxiosInstance from '@/api/defaultAxiosInstance.ts';
import { createAxiosAsyncThunk } from '@/core/redux/typedCreateAsyncThunk.ts';
import { convertImageToBase64 } from '@/core/utils/image.ts';

import { MessageKey, UpdateUserProfileRequest, User } from './types.ts';

export const profileSliceName = 'profile';

export const sendSupportMessage = createAxiosAsyncThunk<MessageKey, string>(
  `${profileSliceName}/sendSupportMessage`,
  async message => {
    const response = await defaultAxiosInstance.post(CONTACT_US_ROUTE, {
      message,
    });
    return response.data;
  },
);

export const getUserProfile = createAxiosAsyncThunk<User, void>(`${profileSliceName}/getUserProfile`, async () => {
  const response = await defaultAxiosInstance.get(PROFILE_ROUTE);
  return response.data;
});

export const updateUserProfile = createAxiosAsyncThunk<MessageKey, UpdateUserProfileRequest>(
  `${profileSliceName}/updateUserProfile`,
  async ({ user }, { dispatch }) => {
    const response = await defaultAxiosInstance.patch(`${PROFILE_ROUTE}/update`, {
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
    console.log('avatar', avatarBase64);
    const response = await defaultAxiosInstance.patch(`${PROFILE_ROUTE}/upload-avatar`, {
      avatarBase64,
    });
    await dispatch(getUserProfile());
    return response.data;
  },
);
