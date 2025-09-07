import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { clearAgents, clearFilter, setAgents, setFilterOrder, setFilterSort, setFilterTags } from '@/store/agents';
import { agentsSelector, filterSelector, tagsSelector } from '@/store/agents/selectors.ts';
import { Agent, OrderFilter, SortFilter } from '@/store/agents/types.ts';

const useAgentsStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const agents = useAppSelector(agentsSelector);
  const filter = useAppSelector(filterSelector);

  const setFilteredAgents = useCallback(
    (filteredAgents: Agent[]) => {
      dispatch(setAgents(filteredAgents));
    },
    [dispatch],
  );

  const clearFilteredAgents = useCallback(() => {
    dispatch(clearAgents());
  }, [dispatch]);

  const setFilterTagsHandler = useCallback(
    (selectedTags: string[]) => {
      dispatch(setFilterTags(selectedTags));
    },
    [dispatch],
  );

  const setFilterSortHandler = useCallback(
    (sort: SortFilter) => {
      dispatch(setFilterSort(sort));
    },
    [dispatch],
  );

  const setFilterOrderHandler = useCallback(
    (order: OrderFilter) => {
      dispatch(setFilterOrder(order));
    },
    [dispatch],
  );

  const clearFilterHandler = useCallback(() => {
    dispatch(clearFilter());
  }, [dispatch]);

  return {
    tags,
    agents,
    filter,
    setFilteredAgents,
    clearFilteredAgents,
    setFilterTagsHandler,
    setFilterSortHandler,
    setFilterOrderHandler,
    clearFilterHandler,
  };
};

export default useAgentsStore;
