import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import AppStub from '@/components/atoms/AppStub.tsx';
import useAgentsStore from '@/hooks/useAgentsStore.ts';
import useAuthStore from '@/hooks/useAuthStore.ts';
import useChatStore from '@/hooks/useChatStore.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';

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
