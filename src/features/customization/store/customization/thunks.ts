import { PROFILE_ROUTE } from '@env';

import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import http from '@/shared/api/http.ts';

import { AvatarFrames } from './types.ts';

export const customizationSliceName = 'customization';

export const getAvatarFrames = createAxiosAsyncThunk<AvatarFrames, void>(
  `${customizationSliceName}/getAvatarFrames`,
  async () => {
    const response = await http.get(`${PROFILE_ROUTE}/avatar-frames`);
    return response.data;
  },
);
