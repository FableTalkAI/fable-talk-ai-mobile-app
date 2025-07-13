import { createAxiosAsyncThunk } from '@/core/redux/typedCreateAsyncThunk.ts';
import defaultAxiosInstance from '@/api/defaultAxiosInstance.ts';
import { agentsSliceName } from '@/store/agents/index.ts';

type Test = number;

export const getAmount = createAxiosAsyncThunk<number, Test>(`${agentsSliceName}/getAmount`, async (kk, {}) => {
  const response = await defaultAxiosInstance.post<number>(`http://localhost:5000/api/amount/${kk}`);
  return response.data;
});

getAmount(12);
