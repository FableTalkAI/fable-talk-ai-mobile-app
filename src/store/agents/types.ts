import { AutoImageSource } from '@/components/atoms/AutoImage/types.ts';

export type AgentsState = {
  tags: string[];
  agents: Agent[];
  pagination: Omit<GetFilteredAgentsResponse, 'data'>;
  searchResults: Agent[];
  loading: {
    tags: boolean;
    agents: boolean;
    searchResults: boolean;
  };
};

export type Agent = {
  ageRestriction: string;
  avatarUrl: AutoImageSource;
  description: string;
  id: string;
  name: string;
  nameLower: string;
  popularity: number;
  prompt: string;
  tags: string[];
};

export type GetResultsOfSearchRequest = {
  searchQuery: string;
};

export type GetFilteredAgentsResponse = {
  data: Agent[];
  hasMore: boolean;
  nextCursor?: string;
};
