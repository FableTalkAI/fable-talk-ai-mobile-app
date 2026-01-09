import { useCallback } from 'react';

import { isLoadingSelector, profileSelector } from '@/features/profile/store/profile/selectors.ts';
import {
  getUserProfile,
  sendSupportMessage,
  updateUserProfile,
  uploadAvatar,
} from '@/features/profile/store/profile/thunks.ts';
import { UpdateUserProfileRequest } from '@/features/profile/store/profile/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useProfileStore = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(isLoadingSelector);
  const profile = useAppSelector(profileSelector);

  const sendSupportMessageHandler = useCallback(
    async (message: string) => {
      await dispatch(sendSupportMessage(message)).unwrap();
    },
    [dispatch],
  );

  const getUserProfileHandler = useCallback(async () => {
    await dispatch(getUserProfile()).unwrap();
  }, [dispatch]);

  const updateUserProfileHandler = useCallback(
    async (user: UpdateUserProfileRequest['user'], showToast?: UpdateUserProfileRequest['showToast']) => {
      await dispatch(updateUserProfile({ user, showToast })).unwrap();
    },
    [dispatch],
  );

  const uploadAvatarHandler = useCallback(
    async (imageUri: string) => {
      await dispatch(uploadAvatar(imageUri)).unwrap();
    },
    [dispatch],
  );

  return {
    isLoading,
    profile,

    sendSupportMessageHandler,
    getUserProfileHandler,
    updateUserProfileHandler,
    uploadAvatarHandler,
  };
};

export default useProfileStore;
