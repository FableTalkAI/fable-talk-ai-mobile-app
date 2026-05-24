import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { navigate } from '@/features/navigation/lib/navigationRef.ts';
import { useNotifications } from '@/features/notifications/hooks/useNotifications.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useSubscriptionInitialization from '@/features/subscriptions/hooks/useSubscriptionInitialization.ts';
import useAppVersionCheck from '@/shared/hooks/useAppVersionCheck.ts';
import useNetworkStatus from '@/shared/hooks/useNetworkStatus';
import { NetworkStatus } from '@/shared/hooks/useNetworkStatus/types.ts';
import AppStub from '@/shared/ui/AppStub.tsx';
import NoNetworkConnectionStub from '@/shared/ui/NoNetworkConnectionStub.tsx';

import { InitialSetupProps } from './types.ts';

const InitialSetup = ({ children }: InitialSetupProps) => {
  const { setIsLoggedInHandler } = useAuthStore();
  const { getUserProfileHandler } = useProfileStore();
  const { getTagsHandler, getAgentsHandler, getMyAgentsHandler, getPopularAgentsHandler } = useAgentsStore();
  const { getAllChatsHandler } = useChatStore();

  const { isLoading: isSubscriptionLoading } = useSubscriptionInitialization();
  const { checkUpdate, isChecking } = useAppVersionCheck();
  const { networkStatus } = useNetworkStatus();

  useNotifications();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (networkStatus === NetworkStatus.Disconnected) return;

    let unsubscribeFromAuth: (() => void) | undefined;

    const init = async () => {
      setIsLoading(true);

      try {
        const { needsUpdate, url } = await checkUpdate();
        if (needsUpdate && !__DEV__) {
          navigate('AppUpdateStub', { url }, 'replace');
          setIsLoading(false);
          return;
        }

        unsubscribeFromAuth = auth().onAuthStateChanged(async user => {
          try {
            setIsLoggedInHandler(!!user);

            if (user) {
              getPopularAgentsHandler().catch(console.error);
              const profile = await getUserProfileHandler();

              if (profile.isCreatedAgent) await getMyAgentsHandler();
              await Promise.all([getTagsHandler(), getAgentsHandler(), getAllChatsHandler()]);
            }
          } catch (e) {
            console.error('Auth/Data loading failed:', e);
          } finally {
            setIsLoading(false);
          }
        });
      } catch (e) {
        console.error('Update check failed:', e);
      }
    };

    init().catch(console.error);

    return () => {
      unsubscribeFromAuth?.();
    };
  }, [
    networkStatus,
    checkUpdate,
    getAgentsHandler,
    getAllChatsHandler,
    getMyAgentsHandler,
    getPopularAgentsHandler,
    getTagsHandler,
    getUserProfileHandler,
    setIsLoggedInHandler,
  ]);

  if (isLoading || isSubscriptionLoading || isChecking) return <AppStub />;

  return (
    <>
      {children}

      <NoNetworkConnectionStub />
    </>
  );
};

export default InitialSetup;
