import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { isLoadingSelector, profileSelector } from '@/store/profile/selectors';
import { getUserProfile, sendSupportMessage, updateUserProfile, uploadAvatar } from '@/store/profile/thunks.ts';
import { UpdateUserProfileRequest } from '@/store/profile/types.ts';

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
