import { AGENTS_ROUTE } from '@env';

import { createAxiosAsyncThunk } from '@/app/store/typedCreateAsyncThunk.ts';
import http from '@/shared/api/http.ts';

import {
  Agent,
  AgentModerationStatus,
  CreateAgentRequest,
  GetFilteredAgentsResponse,
  GetResultsOfSearchRequest,
  Tag,
  UpdateAgentRequest,
} from './types.ts';

export const agentsSliceName = 'agents';

export const createAgent = createAxiosAsyncThunk<void, CreateAgentRequest>(
  `${agentsSliceName}/createAgent`,
  async data => {
    await http.post(`${AGENTS_ROUTE}/create`, data);
  },
);

export const updateAgent = createAxiosAsyncThunk<void, UpdateAgentRequest>(
  `${agentsSliceName}/updateAgent`,
  async ({ agentId, ...data }) => {
    await http.patch(
      `${AGENTS_ROUTE}/`,
      { ...data, moderationStatus: AgentModerationStatus.OnModeration },
      { params: { agentId } },
    );
  },
);

export const getAllUniqueTags = createAxiosAsyncThunk<Tag[], void>(`${agentsSliceName}/getAllUniqueTags`, async () => {
  const response = await http.get(`${AGENTS_ROUTE}/unique-tags`);
  return response.data;
});

export const getPopularAgents = createAxiosAsyncThunk<Agent[], void>(
  `${agentsSliceName}/getPopularAgents`,
  async () => {
    const response = await http.get(`${AGENTS_ROUTE}/popular-agents`);
    return response.data;
  },
);

export const getFilteredAgents = createAxiosAsyncThunk<GetFilteredAgentsResponse, boolean>(
  `${agentsSliceName}/getFilteredAgents`,
  async (loadMore, { getState }) => {
    const state = getState();
    const filter = state.user.filter;
    const cursor = loadMore ? getState().agents.pagination.agents.nextCursor : undefined;

    const payload = {
      ...filter,
      tags: filter.tags?.map(tag => tag.id),
      moderationStatus: 'approved',
      cursor,
    };

    const response = await http.post(`${AGENTS_ROUTE}/agents`, payload);
    return response.data;
  },
);

export const getMyAgents = createAxiosAsyncThunk<GetFilteredAgentsResponse, boolean>(
  `${agentsSliceName}/getMyAgents`,
  async (loadMore, { getState }) => {
    const state = getState();
    const filter = state.user.filter;
    const cursor = loadMore ? getState().agents.pagination.myAgents.nextCursor : undefined;

    const payload = {
      ...filter,
      tags: filter.tags?.map(tag => tag.id),
      isPersonal: true,
      cursor,
    };

    const response = await http.post(`${AGENTS_ROUTE}/agents`, payload);
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
