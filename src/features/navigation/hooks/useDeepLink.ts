import { useCallback, useEffect } from 'react';
import { Linking } from 'react-native';

import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import { getInitialRouteName } from '@/features/navigation/services/getInitialRouteName.ts';
import { parseNavigationPath } from '@/features/navigation/services/parseNavigationPath.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';

import useNavigationRoutes from './useNavigationRoutes';

export const useDeepLink = () => {
  const { navigation } = useNavigationRoutes();

  const { isLoggedIn } = useAuthStore();
  const { profile } = useProfileStore();

  const handleUrl = useCallback(
    (url: string) => {
      if (!url) return;
      const state = navigation.getState();
      const currentRoute = state.routes[state.index];

      const blockedRoute = getInitialRouteName(!!(isLoggedIn && profile), !!profile?.isOnboardingDone, false);
      if (blockedRoute || currentRoute.name === 'AppUpdateStub') return;

      const path = url.includes('://') ? url.split('://')[1] : url;
      const route = parseNavigationPath(path);

      if (route) {
        navigation.navigate(route.name as any, route.params as any);
      }
    },
    [isLoggedIn, navigation, profile],
  );

  useEffect(() => {
    const process = (url: string | null) => {
      if (url) handleUrl(url);
    };

    Linking.getInitialURL().then(process);

    const sub = Linking.addEventListener('url', ({ url }) => {
      process(url);
    });

    return () => sub.remove();
  }, [handleUrl]);
};
