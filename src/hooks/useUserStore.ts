import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import {
  setChats,
  setEmailNotification,
  setIsOnboardingDone,
  setOnboardingStep,
  setProfile,
  setPushNotification,
  setTags,
  setTheme,
} from '@/store/user';
import {
  chatsSelector,
  isOnboardingDoneSelector,
  notificationsSelector,
  onboardingStepSelector,
  profileSelector,
  tagsSelector,
  themeSelector,
} from '@/store/user/selectors.ts';
import { Chat, Theme, UserProfile } from '@/store/user/types.ts';

const useUserStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const profile = useAppSelector(profileSelector);
  const onboardingStepIndex = useAppSelector(onboardingStepSelector);
  const notifications = useAppSelector(notificationsSelector);
  const theme = useAppSelector(themeSelector);
  const chats = useAppSelector(chatsSelector);
  const isOnboardingDone = useAppSelector(isOnboardingDoneSelector);

  const setTagsHandler = useCallback(
    (selectedTags: string[]) => {
      dispatch(setTags(selectedTags));
    },
    [dispatch],
  );

  const setProfileHandler = useCallback(
    (newProfile: UserProfile) => {
      dispatch(setProfile(newProfile));
    },
    [dispatch],
  );

  const setOnboardingStepIndexHandler = useCallback(
    (step: number) => {
      dispatch(setOnboardingStep(step));
    },
    [dispatch],
  );

  const setIsOnboardingDoneHandler = useCallback(
    (isDone: boolean) => {
      dispatch(setIsOnboardingDone(isDone));
    },
    [dispatch],
  );

  const setPushNotificationHandler = useCallback(
    (isActive: boolean) => {
      dispatch(setPushNotification(isActive));
    },
    [dispatch],
  );

  const setEmailNotificationHandler = useCallback(
    (isActive: boolean) => {
      dispatch(setEmailNotification(isActive));
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
    profile,
    onboardingStepIndex,
    theme,
    notifications,
    chats,
    isOnboardingDone,

    setTagsHandler,
    setProfileHandler,
    setOnboardingStepIndexHandler,
    setPushNotificationHandler,
    setEmailNotificationHandler,
    setThemeHandler,
    setChatsHandler,
    setIsOnboardingDoneHandler,
  };
};

export default useUserStore;
