import { useCallback, useState } from 'react';

import { clearSearchResults } from '@/features/agents/store/agents';
import {
  agentsSelector,
  hasModerationLimitSelector,
  isLoadingSelector,
  myAgentsSelector,
  paginationSelector,
  popularAgentsSelector,
  searchResultsSelector,
  tagsSelector,
} from '@/features/agents/store/agents/selectors.ts';
import {
  createAgent,
  getAllUniqueTags,
  getFilteredAgents,
  getMyAgents,
  getPopularAgents,
  getResultsOfSearch,
  updateAgent,
} from '@/features/agents/store/agents/thunks.ts';
import { CreateAgentRequest, UpdateAgentRequest } from '@/features/agents/store/agents/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useAgentsStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const agents = useAppSelector(agentsSelector);
  const myAgents = useAppSelector(myAgentsSelector);
  const searchResults = useAppSelector(searchResultsSelector);
  const popularAgents = useAppSelector(popularAgentsSelector);
  const hasModerationLimit = useAppSelector(hasModerationLimitSelector);

  const isLoading = useAppSelector(isLoadingSelector);
  const pagination = useAppSelector(paginationSelector);

  const [isRefreshingAgents, setIsRefreshingAgents] = useState(false);
  const [isRefreshingMyAgents, setIsRefreshingMyAgents] = useState(false);

  const getSearchResultsHandler = useCallback(
    async (searchQuery: string) => {
      await dispatch(getResultsOfSearch({ searchQuery })).unwrap();
    },
    [dispatch],
  );

  const getAgentsHandler = useCallback(
    async (loadMore: boolean = false) => {
      if (!loadMore) setIsRefreshingAgents(true);

      try {
        await dispatch(getFilteredAgents(loadMore)).unwrap();
      } finally {
        setIsRefreshingAgents(false);
      }
    },
    [dispatch],
  );

  const getMyAgentsHandler = useCallback(
    async (loadMore: boolean = false) => {
      if (!loadMore) setIsRefreshingMyAgents(true);

      try {
        await dispatch(getMyAgents(loadMore)).unwrap();
      } finally {
        setIsRefreshingMyAgents(false);
      }
    },
    [dispatch],
  );

  const createAgentHandler = useCallback(
    async (agentData: CreateAgentRequest) => {
      await dispatch(createAgent(agentData)).unwrap();
    },
    [dispatch],
  );

  const updateAgentHandler = useCallback(
    async (agentData: UpdateAgentRequest) => {
      await dispatch(updateAgent(agentData)).unwrap();
    },
    [dispatch],
  );

  const getTagsHandler = useCallback(async () => {
    await dispatch(getAllUniqueTags()).unwrap();
  }, [dispatch]);

  const getPopularAgentsHandler = useCallback(async () => {
    await dispatch(getPopularAgents()).unwrap();
  }, [dispatch]);

  const clearSearchResultsHandler = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  return {
    tags,
    agents,
    popularAgents,
    myAgents,
    isLoading,
    searchResults,
    agentsPagination: pagination.agents,
    myAgentsPagination: pagination.myAgents,
    isRefreshingAgents,
    isRefreshingMyAgents,
    hasModerationLimit,

    getSearchResultsHandler,
    clearSearchResultsHandler,
    createAgentHandler,
    getAgentsHandler,
    getMyAgentsHandler,
    getTagsHandler,
    updateAgentHandler,
    getPopularAgentsHandler,
  };
};

export default useAgentsStore;
