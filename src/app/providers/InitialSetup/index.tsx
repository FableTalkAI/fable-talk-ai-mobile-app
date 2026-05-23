import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { navigate } from '@/features/navigation/lib/navigationRef.ts';
import { getInitialRouteName } from '@/features/navigation/services/getInitialRouteName.ts';
import { useNotifications } from '@/features/notifications/hooks/useNotifications.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useSubscriptionInitialization from '@/features/subscriptions/hooks/useSubscriptionInitialization.ts';
import useAppVersionCheck from '@/shared/hooks/useAppVersionCheck.ts';
import { useNetworkCheck } from '@/shared/hooks/useNetworkCheck';
import { NetworkStatus } from '@/shared/hooks/useNetworkCheck/types.ts';
import AppStub from '@/shared/ui/AppStub.tsx';

import { InitialSetupProps } from './types.ts';

const InitialSetup = ({ children }: InitialSetupProps) => {
  const { setIsLoggedInHandler, isLoggedIn } = useAuthStore();
  const { getUserProfileHandler, profile } = useProfileStore();
  const { getTagsHandler, getAgentsHandler, getMyAgentsHandler, getPopularAgentsHandler } = useAgentsStore();
  const { getAllChatsHandler } = useChatStore();

  const { isLoading: isSubscriptionLoading } = useSubscriptionInitialization();
  const { checkUpdate, isChecking } = useAppVersionCheck();
  const { status: networkStatus, retryTrigger } = useNetworkCheck();

  useNotifications();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (retryTrigger > 0) {
      setIsLoading(true);
    }
  }, [retryTrigger]);

  useEffect(() => {
    const isReady = !isLoading && !isSubscriptionLoading && !isChecking && networkStatus === NetworkStatus.Connected;
    if (!isReady || retryTrigger === 0) return;

    const handleNavigationAfterReconnect = async () => {
      try {
        const target = getInitialRouteName(!!(isLoggedIn && profile), !!profile?.isOnboardingDone);
        if (target) navigate(target, undefined, 'replace');
      } catch (e) {
        console.error('Navigation after reconnect failed:', e);
      }
    };

    handleNavigationAfterReconnect().catch(console.error);
  }, [isLoading, isSubscriptionLoading, isChecking, networkStatus, retryTrigger, isLoggedIn, profile, checkUpdate]);

  useEffect(() => {
    if (networkStatus === NetworkStatus.Disconnected) return;

    let isMounted = true;

    (async () => {
      try {
        const { needsUpdate, url } = await checkUpdate();
        if (needsUpdate && !__DEV__ && isMounted && networkStatus === NetworkStatus.Connected) {
          navigate('AppUpdateStub', { url }, 'replace');
        }
      } catch (e) {
        console.error('Update check failed:', e);
      }
    })();

    const unsubscribeFromAuth = auth().onAuthStateChanged(async user => {
      try {
        setIsLoggedInHandler(!!user);

        if (user && isMounted) {
          getPopularAgentsHandler().catch(console.error);
          const profile = await getUserProfileHandler();

          if (profile.isCreatedAgent && isMounted) await getMyAgentsHandler();
          if (isMounted) {
            await Promise.all([getTagsHandler(), getAgentsHandler(), getAllChatsHandler()]);
          }
        }
      } catch (e) {
        console.error('Auth/Data loading failed:', e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribeFromAuth();
    };
  }, [
    checkUpdate,
    getAgentsHandler,
    getAllChatsHandler,
    getMyAgentsHandler,
    getPopularAgentsHandler,
    getTagsHandler,
    getUserProfileHandler,
    setIsLoggedInHandler,
    networkStatus,
    retryTrigger,
  ]);

  if (isLoading || isSubscriptionLoading || isChecking) return <AppStub />;

  return <>{children}</>;
};

export default InitialSetup;
