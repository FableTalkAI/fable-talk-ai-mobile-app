import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { setChats, setOnboardingStep, setPushNotification, setTags, setTheme } from '@/store/user';
import {
  chatsSelector,
  notificationsSelector,
  onboardingStepSelector,
  tagsSelector,
  themeSelector,
} from '@/store/user/selectors.ts';
import { Chat, Theme } from '@/store/user/types.ts';

const useUserStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const onboardingStepIndex = useAppSelector(onboardingStepSelector);
  const notifications = useAppSelector(notificationsSelector);
  const theme = useAppSelector(themeSelector);
  const chats = useAppSelector(chatsSelector);

  const setTagsHandler = useCallback(
    (selectedTags: string[]) => {
      dispatch(setTags(selectedTags));
    },
    [dispatch],
  );

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
    tags,
    onboardingStepIndex,
    theme,
    notifications,
    chats,

    setTagsHandler,
    setOnboardingStepIndexHandler,
    setPushNotificationHandler,
    setThemeHandler,
    setChatsHandler,
  };
};

export default useUserStore;
