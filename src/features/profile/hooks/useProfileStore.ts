import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback } from 'react';

import { logoutUser } from '@/features/auth/services/logoutUser.ts';
import { AllNavigationParamList } from '@/features/navigation/hooks/useNavigationRoutes/types.ts';
import { isLoadingSelector, limitsSelector, profileSelector } from '@/features/profile/store/profile/selectors.ts';
import {
  deleteUserProfile,
  getUserLimits,
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
  const limits = useAppSelector(limitsSelector);

  const sendSupportMessageHandler = useCallback(
    async (message: string) => {
      await dispatch(sendSupportMessage(message)).unwrap();
    },
    [dispatch],
  );

  const getUserProfileHandler = useCallback(async () => {
    await dispatch(getUserProfile()).unwrap();
  }, [dispatch]);

  const getUserLimitsHandler = useCallback(async () => {
    await dispatch(getUserLimits()).unwrap();
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

  const deleteUserProfileHandler = useCallback(
    async (navigation: StackNavigationProp<AllNavigationParamList>) => {
      await dispatch(deleteUserProfile()).unwrap();
      await logoutUser(navigation);
    },
    [dispatch],
  );

  return {
    isLoading,
    profile,
    limits,

    sendSupportMessageHandler,
    getUserProfileHandler,
    updateUserProfileHandler,
    uploadAvatarHandler,
    deleteUserProfileHandler,
    getUserLimitsHandler,
  };
};

export default useProfileStore;
