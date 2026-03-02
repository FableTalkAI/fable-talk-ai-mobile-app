import { useCallback } from 'react';

import { Tag } from '@/features/agents/store/agents/types.ts';
import {
  clearFilter,
  setFilterSort,
  setFilterSortBy,
  setFilterTags,
  setOnboardingStep,
  setPushNotification,
  setTheme,
  updatePinnedChatIds,
} from '@/features/profile/store/user';
import {
  filterSelector,
  notificationsSelector,
  onboardingStepSelector,
  pinnedChatIdsSelector,
  themeSelector,
} from '@/features/profile/store/user/selectors.ts';
import { SortByFilter, SortFilter, Theme } from '@/features/profile/store/user/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useUserStore = () => {
  const dispatch = useAppDispatch();

  const onboardingStepIndex = useAppSelector(onboardingStepSelector);
  const notifications = useAppSelector(notificationsSelector);
  const theme = useAppSelector(themeSelector);
  const filter = useAppSelector(filterSelector);
  const pinnedChatIds = useAppSelector(pinnedChatIdsSelector);

  const setFilterTagsHandler = useCallback(
    (selectedTags: Tag[]) => {
      dispatch(setFilterTags(selectedTags));
    },
    [dispatch],
  );

  const setFilterSortByHandler = useCallback(
    (sortBy: SortByFilter) => {
      dispatch(setFilterSortBy(sortBy));
    },
    [dispatch],
  );

  const setFilterSortHandler = useCallback(
    (sort: SortFilter) => {
      dispatch(setFilterSort(sort));
    },
    [dispatch],
  );

  const clearFilterHandler = useCallback(() => {
    dispatch(clearFilter());
  }, [dispatch]);

  const setOnboardingStepIndexHandler = useCallback(
    (step: number) => {
      dispatch(setOnboardingStep(step));
    },
    [dispatch],
  );

  const setPushNotificationHandler = useCallback(
    (isActive: boolean) => {
      dispatch(setPushNotification(isActive));
    },
    [dispatch],
  );

  const setThemeHandler = useCallback(
    (themeMode: Theme) => {
      dispatch(setTheme(themeMode));
    },
    [dispatch],
  );

  const updatePinnedChatIdsHandler = useCallback(
    (chatId: string) => {
      dispatch(updatePinnedChatIds(chatId));
    },
    [dispatch],
  );

  return {
    filter,
    onboardingStepIndex,
    theme,
    notifications,
    pinnedChatIds,

    setOnboardingStepIndexHandler,
    setPushNotificationHandler,
    setThemeHandler,
    setFilterTagsHandler,
    setFilterSortHandler,
    setFilterSortByHandler,
    clearFilterHandler,
    updatePinnedChatIdsHandler,
  };
};

export default useUserStore;
