export enum AgentAccessLevel {
  Free = 'free',
  Premium = 'premium',
}

export enum AgentModerationStatus {
  Approved = 'approved',
  OnModeration = 'onModeration',
}

export type AgentsState = {
  tags: string[];
  agents: Agent[];
  myAgents: Agent[];
  searchResults: Agent[];
  pagination: {
    agents: Omit<GetFilteredAgentsResponse, 'data'>;
    myAgents: Omit<GetFilteredAgentsResponse, 'data'>;
  };
  loading: {
    tags: boolean;
    agents: boolean;
    myAgents: boolean;
    searchResults: boolean;
    createAgent: boolean;
  };
};

export type Agent = {
  id: string;
  accessLevel: AgentAccessLevel;
  createdAt: string;
  createdBy: string;
  moderationStatus: AgentModerationStatus;
  avatarUrl: string;
  description: string;
  name: string;
  nameLower: string;
  tags: string[];
  ageRestriction: string;
  popularity: number;
  prompt: string;
};

export type GetResultsOfSearchRequest = {
  searchQuery: string;
};

export type CreateAgentRequest = {
  description: string;
  name: string;
  tags: string[];
  prompt: string;
  avatarBase64: string | null;
};

export type GetFilteredAgentsResponse = {
  data: Agent[];
  hasMore: boolean;
  nextCursor?: string;
};
