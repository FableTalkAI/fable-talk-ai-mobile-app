import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { clearSearchResults } from '@/store/agents/index.ts';
import {
  agentsSelector,
  isLoadingSelector,
  paginationSelector,
  searchResultsSelector,
  tagsSelector,
} from '@/store/agents/selectors.ts';
import { getAllUniqueTags, getFilteredAgents, getResultsOfSearch } from '@/store/agents/thunks.ts';

const useAgentsStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const agents = useAppSelector(agentsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const searchResults = useAppSelector(searchResultsSelector);
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

  const getTagsHandler = useCallback(async () => {
    await dispatch(getAllUniqueTags()).unwrap();
  }, [dispatch]);

  const clearSearchResultsHandler = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  return {
    tags,
    agents,
    isLoading,
    searchResults,
    pagination,

    getSearchResultsHandler,
    clearSearchResultsHandler,
    getAgentsHandler,
    getTagsHandler,
  };
};

export default useAgentsStore;
