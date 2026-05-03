import { useCallback } from 'react';

import { setChatBackground, setUserAvatarFrame } from '@/features/customization/store/customization';
import {
  avatarFramesSelector,
  chatBackgroundSelector,
  isLoadingSelector,
  userAvatarFrameSelector,
} from '@/features/customization/store/customization/selectors.ts';
import { getAvatarFrames } from '@/features/customization/store/customization/thunks.ts';
import { CustomizationState } from '@/features/customization/store/customization/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useCustomizationStore = () => {
  const dispatch = useAppDispatch();

  const avatarFrames = useAppSelector(avatarFramesSelector);
  const chatBackground = useAppSelector(chatBackgroundSelector);
  const userAvatarFrame = useAppSelector(userAvatarFrameSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  const getAvatarFramesHandler = useCallback(async () => {
    return await dispatch(getAvatarFrames()).unwrap();
  }, [dispatch]);

  const setUserAvatarFrameHandler = useCallback(
    (data: CustomizationState['userAvatarFrame']) => dispatch(setUserAvatarFrame(data)),
    [dispatch],
  );

  const setChatBackgroundHandler = useCallback(
    (data: CustomizationState['chatBackground']) => dispatch(setChatBackground(data)),
    [dispatch],
  );

  return {
    isLoading,
    avatarFrames,
    userAvatarFrame,
    chatBackground,

    getAvatarFramesHandler,
    setUserAvatarFrameHandler,
    setChatBackgroundHandler,
  };
};

export default useCustomizationStore;
