import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { setOnboardingStep, setProfile, setTags, setTheme } from '@/store/user';
import { onboardingStepSelector, profileSelector, tagsSelector, themeSelector } from '@/store/user/selectors.ts';
import { Theme, UserProfile } from '@/store/user/types.ts';

const useUserStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const profile = useAppSelector(profileSelector);
  const onboardingStep = useAppSelector(onboardingStepSelector);
  const theme = useAppSelector(themeSelector);

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

  const setThemeHandler = useCallback(
    (themeMode: Theme) => {
      dispatch(setTheme(themeMode));
    },
    [dispatch],
  );

  return {
    tags,
    profile,
    onboardingStep,
    theme,
    setTagsHandler,
    setProfileHandler,
    setOnboardingStepHandler,
    setThemeHandler,
  };
};

export default useUserStore;
