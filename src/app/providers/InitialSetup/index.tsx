import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import useAgentsStore from '@/features/agents/hooks/useAgentsStore.ts';
import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import useNavigationRoutes from '@/features/navigation/hooks/useNavigationRoutes';
import { useNotifications } from '@/features/notifications/hooks/useNotifications.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import useSubscriptionInitialization from '@/features/subscriptions/hooks/useSubscriptionInitialization.ts';
import useAppVersionCheck from '@/shared/hooks/useAppVersionCheck.ts';
import AppStub from '@/shared/ui/AppStub.tsx';

import { InitialSetupProps } from './types.ts';

const InitialSetup = ({ children }: InitialSetupProps) => {
  const { navigation } = useNavigationRoutes();

  const { setIsLoggedInHandler } = useAuthStore();
  const { getUserProfileHandler } = useProfileStore();
  const { getTagsHandler, getAgentsHandler, getMyAgentsHandler } = useAgentsStore();
  const { getAllChatsHandler } = useChatStore();

  const { isLoading: isSubscriptionLoading } = useSubscriptionInitialization();
  const { checkUpdate, isChecking } = useAppVersionCheck();

  useNotifications();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const appVersion = await checkUpdate();

      if (appVersion.needsUpdate) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppUpdateStub', params: { url: appVersion.url } }],
        });
      }
    })();

    auth().onAuthStateChanged(async user => {
      try {
        setIsLoggedInHandler(!!user);

        if (user) {
          const profile = await getUserProfileHandler();

          if (profile.isCreatedAgent) await getMyAgentsHandler();
          await Promise.all([getTagsHandler(), getAgentsHandler(), getAllChatsHandler()]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    });
  }, [
    checkUpdate,
    getAgentsHandler,
    getAllChatsHandler,
    getMyAgentsHandler,
    getTagsHandler,
    getUserProfileHandler,
    navigation,
    setIsLoggedInHandler,
  ]);

  if (isLoading || isSubscriptionLoading || isChecking) return <AppStub />;

  return <>{children}</>;
};

export default InitialSetup;
