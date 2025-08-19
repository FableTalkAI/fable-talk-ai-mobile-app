import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { setOnboardingStep, setProfile, setTags } from '@/store/user';
import { onboardingStepSelector, profileSelector, tagsSelector } from '@/store/user/selectors.ts';
import { UserProfile } from '@/store/user/types.ts';

const useUserStore = () => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(tagsSelector);
  const profile = useAppSelector(profileSelector);
  const onboardingStep = useAppSelector(onboardingStepSelector);

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

  return {
    tags,
    profile,
    onboardingStep,
    setTagsHandler,
    setProfileHandler,
    setOnboardingStepHandler,
  };
};

export default useUserStore;
