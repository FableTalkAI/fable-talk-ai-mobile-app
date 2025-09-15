import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import {
  setChats,
  setEmailNotification,
  setOnboardingStep,
  setProfile,
  setPushNotification,
  setTags,
  setTheme,
} from '@/store/user';
import {
  chatsSelector,
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
  const onboardingStep = useAppSelector(onboardingStepSelector);
  const notifications = useAppSelector(notificationsSelector);
  const theme = useAppSelector(themeSelector);
  const chats = useAppSelector(chatsSelector);

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

  const setOnboardingStepHandler = useCallback(
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
    onboardingStep,
    theme,
    notifications,
    chats,
    setTagsHandler,
    setProfileHandler,
    setOnboardingStepHandler,
    setPushNotificationHandler,
    setEmailNotificationHandler,
    setThemeHandler,
    setChatsHandler,
  };
};

export default useUserStore;
