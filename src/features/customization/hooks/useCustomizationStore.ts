import { useCallback } from 'react';

import { setUserAvatarFrame } from '@/features/customization/store/customization';
import {
  avatarFramesSelector,
  isLoadingSelector,
  userAvatarFrameSelector,
} from '@/features/customization/store/customization/selectors.ts';
import { getAvatarFrames } from '@/features/customization/store/customization/thunks.ts';
import { CustomizationState } from '@/features/customization/store/customization/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useCustomizationStore = () => {
  const dispatch = useAppDispatch();

  const avatarFrames = useAppSelector(avatarFramesSelector);
  const userAvatarFrame = useAppSelector(userAvatarFrameSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  const getAvatarFramesHandler = useCallback(async () => {
    return await dispatch(getAvatarFrames()).unwrap();
  }, [dispatch]);

  const setUserAvatarFrameHandler = useCallback(
    (data: CustomizationState['userAvatarFrame']) => dispatch(setUserAvatarFrame(data)),
    [dispatch],
  );

  return {
    isLoading,
    avatarFrames,
    userAvatarFrame,

    getAvatarFramesHandler,
    setUserAvatarFrameHandler,
  };
};

export default useCustomizationStore;
