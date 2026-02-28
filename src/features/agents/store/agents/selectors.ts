import { AppState } from '@/app/store';

export const tagsSelector = (state: AppState) => state.agents.tags;
export const agentsSelector = (state: AppState) => state.agents.agents;
export const myAgentsSelector = (state: AppState) => state.agents.myAgents;
export const searchResultsSelector = (state: AppState) => state.agents.searchResults;

export const isLoadingSelector = (state: AppState) => state.agents.loading;
export const paginationSelector = (state: AppState) => state.agents.pagination;
export const hasModerationLimitSelector = (state: AppState) => state.agents.hasModerationLimit;
