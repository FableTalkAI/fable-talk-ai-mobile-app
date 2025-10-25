import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import {
  clearFilter,
  setChats,
  setFilterSort,
  setFilterSortBy,
  setFilterTags,
  setOnboardingStep,
  setPushNotification,
  setTheme,
} from '@/store/user';
import {
  chatsSelector,
  filterSelector,
  notificationsSelector,
  onboardingStepSelector,
  themeSelector,
} from '@/store/user/selectors.ts';
import { Chat, SortByFilter, SortFilter, Theme } from '@/store/user/types.ts';

const useUserStore = () => {
  const dispatch = useAppDispatch();

  const onboardingStepIndex = useAppSelector(onboardingStepSelector);
  const notifications = useAppSelector(notificationsSelector);
  const theme = useAppSelector(themeSelector);
  const chats = useAppSelector(chatsSelector);
  const filter = useAppSelector(filterSelector);

  const setFilterTagsHandler = useCallback(
    (selectedTags: string[]) => {
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

  const setChatsHandler = useCallback(
    (activeChats: Chat[]) => {
      dispatch(setChats(activeChats));
    },
    [dispatch],
  );

  return {
    filter,
    onboardingStepIndex,
    theme,
    notifications,
    chats,

    setOnboardingStepIndexHandler,
    setPushNotificationHandler,
    setThemeHandler,
    setChatsHandler,
    setFilterTagsHandler,
    setFilterSortHandler,
    setFilterSortByHandler,
    clearFilterHandler,
  };
};

export default useUserStore;
