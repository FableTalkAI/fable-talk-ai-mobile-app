import { useCallback } from 'react';

import { setIsLoggedIn, setVerifyData } from '@/features/auth/store/auth';
import { isLoadingSelector, isLoggedInSelector, verifyDataSelector } from '@/features/auth/store/auth/selectors.ts';
import { sendOtp, upsertGoogle, verifyOtp } from '@/features/auth/store/auth/thunks.ts';
import { SendOtpRequest, UpsertGoogleRequest, VerifyData, VerifyOtpRequest } from '@/features/auth/store/auth/types.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

import useProfileStore from '../../profile/hooks/useProfileStore.ts';

const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { navigation } = useNavigationRoutes();
  const { profile } = useProfileStore();

  const isLoading = useAppSelector(isLoadingSelector);
  const verifyData = useAppSelector(verifyDataSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const setVerifyDataHandler = useCallback(
    (data: VerifyData) => {
      dispatch(setVerifyData(data));
    },
    [dispatch],
  );

  const setIsLoggedInHandler = useCallback(
    (isLogged: boolean) => {
      dispatch(setIsLoggedIn(isLogged));
    },
    [dispatch],
  );

  const sendOtpHandler = useCallback(
    async (data: SendOtpRequest) => {
      await dispatch(sendOtp(data)).unwrap();
      navigation.navigate('CodeVerification');
    },
    [dispatch, navigation],
  );

  const verifyOtpHandler = useCallback(
    async (data: VerifyOtpRequest) => {
      await dispatch(verifyOtp(data)).unwrap();

      if (profile && profile.isOnboardingDone) {
        return navigation.reset({
          index: 0,
          routes: [{ name: 'TabBarNavigator', params: { screen: 'Home' } }],
        });
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    },
    [dispatch, profile, navigation],
  );

  const upsertGoogleHandler = useCallback(
    async (data: UpsertGoogleRequest) => {
      await dispatch(upsertGoogle(data)).unwrap();

      if (profile && profile.isOnboardingDone) {
        return navigation.reset({
          index: 0,
          routes: [{ name: 'TabBarNavigator', params: { screen: 'Home' } }],
        });
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    },
    [dispatch, navigation, profile],
  );

  return {
    isLoading,
    verifyData,
    isLoggedIn,

    sendOtpHandler,
    verifyOtpHandler,
    upsertGoogleHandler,
    setVerifyDataHandler,
    setIsLoggedInHandler,
  };
};

export default useAuthStore;
