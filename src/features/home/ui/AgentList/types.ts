import { ReactElement } from 'react';

import { Agent } from '@/features/agents/store/agents/types.ts';

export type AgentListProps = {
  data: Agent[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  onRefresh: () => Promise<void>;
  onLoadMore: (loadMore?: boolean) => Promise<void>;
  onAgentPress: (id: string) => () => Promise<void>;
  ListEmptyComponent?: ReactElement;
};
