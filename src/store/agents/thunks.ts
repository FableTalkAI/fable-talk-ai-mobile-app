import { AGENTS_ROUTE } from '@env';

import defaultAxiosInstance from '@/api/defaultAxiosInstance.ts';
import { createAxiosAsyncThunk } from '@/core/redux/typedCreateAsyncThunk.ts';
import { SendOtpRequest } from '@/store/auth/types.ts';

import { Agent, GetFilteredAgentsResponse, GetResultsOfSearchRequest } from './types.ts';

export const agentsSliceName = 'agents';

export const createAgent = createAxiosAsyncThunk<void, SendOtpRequest>(`${agentsSliceName}/createAgent`, async data => {
  await defaultAxiosInstance.post(`${AGENTS_ROUTE}/create`, data);
});

export const getAllUniqueTags = createAxiosAsyncThunk<string[], void>(
  `${agentsSliceName}/getAllUniqueTags`,
  async () => {
    const response = await defaultAxiosInstance.get(`${AGENTS_ROUTE}/unique-tags`);
    return response.data;
  },
);

export const getFilteredAgents = createAxiosAsyncThunk<GetFilteredAgentsResponse, boolean>(
  `${agentsSliceName}/getFilteredAgents`,
  async (loadMore, { getState }) => {
    const filter = getState().user.filter;
    const cursor = loadMore ? getState().agents.pagination.nextCursor : undefined;

    const response = await defaultAxiosInstance.post(`${AGENTS_ROUTE}/agents`, { ...filter, cursor });
    return response.data;
  },
);

export const getResultsOfSearch = createAxiosAsyncThunk<Agent[], GetResultsOfSearchRequest>(
  `${agentsSliceName}/getResultsOfSearch`,
  async searchQuery => {
    const response = await defaultAxiosInstance.get(`${AGENTS_ROUTE}/search`, {
      params: { ...searchQuery },
    });
    return response.data;
  },
);
