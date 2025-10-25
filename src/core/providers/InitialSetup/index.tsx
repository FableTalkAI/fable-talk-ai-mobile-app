import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

import useAgentsStore from '@/hooks/useAgentsStore.ts';
import useAuthStore from '@/hooks/useAuthStore.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';

import { InitialSetupProps } from './types.ts';

const InitialSetup = ({ children }: InitialSetupProps) => {
  const { setIsLoggedInHandler } = useAuthStore();
  const { getUserProfileHandler } = useProfileStore();
  const { getTagsHandler, getAgentsHandler } = useAgentsStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(async user => {
      setIsLoggedInHandler(!!user);
      if (user) {
        setIsLoggedInHandler(true);

        await getUserProfileHandler();
        await getTagsHandler();
        await getAgentsHandler();
      } else {
        setIsLoggedInHandler(false);
      }

      setIsLoading(false);
    });
  }, [getAgentsHandler, getTagsHandler, getUserProfileHandler, setIsLoggedInHandler]);

  if (isLoading) return null;

  return <>{children}</>;
};

export default InitialSetup;
