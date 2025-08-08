import defaultAxiosInstance from '@/api/defaultAxiosInstance.ts';
import { createAxiosAsyncThunk } from '@/core/redux/typedCreateAsyncThunk.ts';

import { agentsSliceName } from './index.ts';

type Test = number;

export const getAmount = createAxiosAsyncThunk<number, Test>(`${agentsSliceName}/getAmount`, async (kk, {}) => {
  const response = await defaultAxiosInstance.post<number>(`http://localhost:5000/api/amount/${kk}`);
  return response.data;
});

getAmount(12);
