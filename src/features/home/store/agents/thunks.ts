import { AGENTS_ROUTE } from '@env';

import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import { SendOtpRequest } from '@/features/auth/store/auth/types.ts';
import http from '@/shared/api/http.ts';

import { Agent, GetFilteredAgentsResponse, GetResultsOfSearchRequest } from './types.ts';

export const agentsSliceName = 'agents';

export const createAgent = createAxiosAsyncThunk<void, SendOtpRequest>(`${agentsSliceName}/createAgent`, async data => {
  await http.post(`${AGENTS_ROUTE}/create`, data);
});

export const getAllUniqueTags = createAxiosAsyncThunk<string[], void>(
  `${agentsSliceName}/getAllUniqueTags`,
  async () => {
    const response = await http.get(`${AGENTS_ROUTE}/unique-tags`);
    return response.data;
  },
);

export const getFilteredAgents = createAxiosAsyncThunk<GetFilteredAgentsResponse, boolean>(
  `${agentsSliceName}/getFilteredAgents`,
  async (loadMore, { getState }) => {
    const filter = getState().user.filter;
    const cursor = loadMore ? getState().agents.pagination.nextCursor : undefined;

    const response = await http.post(`${AGENTS_ROUTE}/agents`, { ...filter, cursor });
    return response.data;
  },
);

export const getResultsOfSearch = createAxiosAsyncThunk<Agent[], GetResultsOfSearchRequest>(
  `${agentsSliceName}/getResultsOfSearch`,
  async searchQuery => {
    const response = await http.get(`${AGENTS_ROUTE}/search`, {
      params: { ...searchQuery },
    });
    return response.data;
  },
);
