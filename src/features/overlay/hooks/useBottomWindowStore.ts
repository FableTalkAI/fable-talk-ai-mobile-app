import { useCallback } from 'react';

import { setCustomContent, setIsLocked } from '@/features/overlay/store/bottomWindow';
import { customContentSelector, isLockedSelector } from '@/features/overlay/store/bottomWindow/selectors.ts';
import { CustomRender } from '@/features/overlay/store/bottomWindow/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useBottomWindowStore = () => {
  const dispatch = useAppDispatch();

  const isLocked = useAppSelector(isLockedSelector);
  const customContent = useAppSelector(customContentSelector);

  const setIsLockedHandler = useCallback(
    (lock: boolean) => {
      dispatch(setIsLocked(lock));
    },
    [dispatch],
  );

  const setCustomContentHandler = useCallback(
    (renderFc: CustomRender) => {
      dispatch(setCustomContent(renderFc));
    },
    [dispatch],
  );

  return {
    isLocked,
    customContent,

    setIsLockedHandler,
    setCustomContentHandler,
  };
};

export default useBottomWindowStore;
