import { useCallback } from 'react';

import { setBottomWindowMode } from '@/features/bottomWindow/store/bottomWindow';
import { bottomWindowModeSelector } from '@/features/bottomWindow/store/bottomWindow/selectors.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

import { BottomWindowModes } from './useBottomWindow/types.ts';

const useBottomWindowStore = () => {
  const dispatch = useAppDispatch();

  const bottomWindowMode = useAppSelector(bottomWindowModeSelector);

  const setBottomWindowModeHandler = useCallback(
    (mode?: BottomWindowModes) => {
      dispatch(setBottomWindowMode(mode ?? null));
    },
    [dispatch],
  );

  return {
    setBottomWindowModeHandler,
    bottomWindowMode,
  };
};

export default useBottomWindowStore;
