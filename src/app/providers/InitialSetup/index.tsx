import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import useAgentsStore from '@/features/home/hooks/useAgentsStore.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { getMsUntilMidnight } from '@/shared/lib/date.ts';
import AppStub from '@/shared/ui/AppStub.tsx';

import { InitialSetupProps } from './types.ts';

const InitialSetup = ({ children }: InitialSetupProps) => {
  const { setIsLoggedInHandler, isLoggedIn } = useAuthStore();
  const { getUserProfileHandler, getUserLimitsHandler } = useProfileStore();
  const { getTagsHandler, getAgentsHandler } = useAgentsStore();
  const { getAllChatsHandler } = useChatStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(async user => {
      try {
        setIsLoggedInHandler(!!user);

        if (user) {
          await getUserProfileHandler();
          await Promise.all([getTagsHandler(), getAgentsHandler(), getAllChatsHandler()]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    });
  }, [getAgentsHandler, getAllChatsHandler, getTagsHandler, getUserProfileHandler, setIsLoggedInHandler]);

  // Timer to get actual user limits
  useEffect(() => {
    if (!isLoggedIn) return;
    let refreshTimer: NodeJS.Timeout;

    const syncLimits = async () => {
      await getUserLimitsHandler();
      const delay = getMsUntilMidnight();
      refreshTimer = setTimeout(syncLimits, delay);
    };

    syncLimits().catch(console.error);

    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        syncLimits().catch(console.error);
      }
    });

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      subscription.remove();
    };
  }, [isLoggedIn, getUserLimitsHandler]);

  if (isLoading) return <AppStub />;

  return <>{children}</>;
};

export default InitialSetup;
