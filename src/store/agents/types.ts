import { ImageSourcePropType } from 'react-native';

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
  name: string;
  id: string;
  description: string;
  tags: string[];
  avatarSource: ImageSourcePropType;
};

export type GetResultsOfSearchRequest = {
  searchQuery: string;
};

export type GetFilteredAgentsResponse = {
  data: Agent[];
  hasMore: boolean;
  nextCursor?: string;
};
