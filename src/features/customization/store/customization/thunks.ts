import { PROFILE_ROUTE } from '@env';

import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import { AvatarFrames } from '@/features/profile/store/profile/types.ts';
import http from '@/shared/api/http.ts';

export const customizationSliceName = 'customization';

export const getAvatarFrames = createAxiosAsyncThunk<AvatarFrames, void>(
  `${customizationSliceName}/getAvatarFrames`,
  async () => {
    const response = await http.get(`${PROFILE_ROUTE}/avatar-frames`);
    return response.data;
  },
);
