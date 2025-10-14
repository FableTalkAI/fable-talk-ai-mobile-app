import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { isLoadingSelector } from '@/store/profile/selectors';
import { sendSupportMessage } from '@/store/profile/thunks.ts';

const useProfileStore = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  const sendSupportMessageHandler = useCallback(
    async (message: string) => {
      await dispatch(sendSupportMessage(message)).unwrap();
    },
    [dispatch],
  );

  return {
    isLoading,
    sendSupportMessageHandler,
  };
};

export default useProfileStore;
