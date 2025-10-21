import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { setIsLoggedIn, setVerifyData } from '@/store/auth/index.ts';
import { isLoadingSelector, isLoggedInSelector, verifyDataSelector } from '@/store/auth/selectors.ts';
import { sendOtp, upsertGoogle, verifyOtp } from '@/store/auth/thunks.ts';
import { SendOtpRequest, UpsertGoogleRequest, VerifyData, VerifyOtpRequest } from '@/store/auth/types.ts';

import useNavigationRoutes from './useNavigationRoutes/index.ts';
import useProfileStore from './useProfileStore.ts';

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
