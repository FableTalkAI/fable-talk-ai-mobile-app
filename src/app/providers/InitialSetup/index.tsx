import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import useAgentsStore from '@/features/home/hooks/useAgentsStore.ts';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import AppStub from '@/shared/ui/AppStub.tsx';

import { InitialSetupProps } from './types.ts';

const InitialSetup = ({ children }: InitialSetupProps) => {
  const { setIsLoggedInHandler } = useAuthStore();
  const { getUserProfileHandler } = useProfileStore();
  const { getTagsHandler, getAgentsHandler } = useAgentsStore();
  const { getAllChatsHandler } = useChatStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(async user => {
      try {
        setIsLoggedInHandler(!!user);

        if (user) {
          await getUserProfileHandler();
          await getTagsHandler();
          await getAgentsHandler();
          await getAllChatsHandler();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    });
  }, [getAgentsHandler, getAllChatsHandler, getTagsHandler, getUserProfileHandler, setIsLoggedInHandler]);

  if (isLoading) return <AppStub />;

  return <>{children}</>;
};

export default InitialSetup;
