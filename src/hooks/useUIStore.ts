import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/core/redux/hooks.ts';
import { setBottomWindowMode } from '@/store/ui';
import { bottomWindowModeSelector } from '@/store/ui/selectors.ts';

import { BottomWindowModes } from './useBottomWindow/types.ts';

const useUIStore = () => {
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

export default useUIStore;
