import { CONTACT_US_ROUTE } from '@env';

import defaultAxiosInstance from '@/api/defaultAxiosInstance.ts';
import { createAxiosAsyncThunk } from '@/core/redux/typedCreateAsyncThunk.ts';

import { SendSupportMessageResponse } from './types.ts';

export const profileSliceName = 'profile';

export const sendSupportMessage = createAxiosAsyncThunk<SendSupportMessageResponse, string>(
  `${profileSliceName}/sendSupportMessage`,
  async message => {
    const response = await defaultAxiosInstance.post(CONTACT_US_ROUTE, {
      message,
    });
    return response.data;
  },
);
