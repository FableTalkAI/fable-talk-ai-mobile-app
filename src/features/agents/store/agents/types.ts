export enum AgentAccessLevel {
  Free = 'free',
  Premium = 'premium',
}

export enum AgentModerationStatus {
  Approved = 'approved',
  OnModeration = 'onModeration',
  Rejected = 'rejected',
}

export type AgentsState = {
  tags: string[];
  agents: Agent[];
  myAgents: Agent[];
  searchResults: Agent[];
  hasModerationLimit: boolean;
  pagination: {
    agents: Pagination;
    myAgents: Pagination;
  };
  loading: {
    tags: boolean;
    agents: boolean;
    myAgents: boolean;
    searchResults: boolean;
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
  popularity: number;
  prompt: string;
  moderationComment?: string;
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

export type UpdateAgentRequest = {
  agentId: string;
  moderationStatus?: AgentModerationStatus;
} & Partial<CreateAgentRequest>;

export type GetFilteredAgentsResponse = {
  data: Agent[];
  hasMore: boolean;
  nextCursor?: string;
  hasModerationLimit: boolean;
};

export type Pagination = Pick<GetFilteredAgentsResponse, 'hasMore' | 'nextCursor'>;
