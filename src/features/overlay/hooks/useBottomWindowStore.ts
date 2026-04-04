import { useCallback } from 'react';

import { setBottomWindowCustomContent, setBottomWindowIsLocked } from '@/features/overlay/store/overlay';
import {
  bottomWindowCustomContentSelector,
  bottomWindowIsLockedSelector,
} from '@/features/overlay/store/overlay/selectors.ts';
import { CustomRender } from '@/features/overlay/store/overlay/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

const useBottomWindowStore = () => {
  const dispatch = useAppDispatch();

  const isLocked = useAppSelector(bottomWindowIsLockedSelector);
  const customContent = useAppSelector(bottomWindowCustomContentSelector);

  const setIsLockedHandler = useCallback(
    (lock: boolean) => {
      dispatch(setBottomWindowIsLocked(lock));
    },
    [dispatch],
  );

  const setCustomContentHandler = useCallback(
    (renderFc: CustomRender) => {
      dispatch(setBottomWindowCustomContent(renderFc));
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
