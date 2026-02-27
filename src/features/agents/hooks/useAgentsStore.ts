import { useCallback } from 'react';

import { clearSearchResults } from '@/features/agents/store/agents';
import {
  agentsSelector,
  isLoadingSelector,
  myAgentsSelector,
  paginationSelector,
  searchResultsSelector,
  tagsSelector,
} from '@/features/agents/store/agents/selectors.ts';
import {
  createAgent,
  getAllUniqueTags,
  getFilteredAgents,
  getMyAgents,
  getResultsOfSearch,
} from '@/features/agents/store/agents/thunks.ts';
import { CreateAgentRequest } from '@/features/agents/store/agents/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useAgentsStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const agents = useAppSelector(agentsSelector);
  const myAgents = useAppSelector(myAgentsSelector);
  const searchResults = useAppSelector(searchResultsSelector);

  const isLoading = useAppSelector(isLoadingSelector);
  const pagination = useAppSelector(paginationSelector);

  const getSearchResultsHandler = useCallback(
    async (searchQuery: string) => {
      await dispatch(getResultsOfSearch({ searchQuery })).unwrap();
    },
    [dispatch],
  );

  const getAgentsHandler = useCallback(
    async (loadMore: boolean = false) => {
      await dispatch(getFilteredAgents(loadMore)).unwrap();
    },
    [dispatch],
  );

  const getMyAgentsHandler = useCallback(
    async (loadMore: boolean = false) => {
      await dispatch(getMyAgents(loadMore)).unwrap();
    },
    [dispatch],
  );

  const createAgentHandler = useCallback(
    async (agentData: CreateAgentRequest) => {
      return await dispatch(createAgent(agentData)).unwrap();
    },
    [dispatch],
  );

  const getTagsHandler = useCallback(async () => {
    await dispatch(getAllUniqueTags()).unwrap();
  }, [dispatch]);

  const clearSearchResultsHandler = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  return {
    tags,
    agents,
    myAgents,
    isLoading,
    searchResults,
    agentsPagination: pagination.agents,
    myAgentsPagination: pagination.myAgents,

    getSearchResultsHandler,
    clearSearchResultsHandler,
    createAgentHandler,
    getAgentsHandler,
    getMyAgentsHandler,
    getTagsHandler,
  };
};

export default useAgentsStore;
