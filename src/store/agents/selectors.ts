import { AppState } from '@/store';

export const tagsSelector = (state: AppState) => state.agents.tags;
export const agentsSelector = (state: AppState) => state.agents.agents;
export const filterSelector = (state: AppState) => state.agents.filter;
