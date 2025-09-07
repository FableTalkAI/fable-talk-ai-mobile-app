import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { clearFilter, setFilterOrder, setFilterSort, setFilterTags } from '@/store/agents';
import { agentsSelector, filterSelector, tagsSelector } from '@/store/agents/selectors.ts';
import { OrderFilter, SortFilter } from '@/store/agents/types.ts';

const useAgentsStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const agents = useAppSelector(agentsSelector);
  const filter = useAppSelector(filterSelector);

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
    setFilterTagsHandler,
    setFilterSortHandler,
    setFilterOrderHandler,
    clearFilterHandler,
  };
};

export default useAgentsStore;
