import { useCallback } from 'react';

import { setBottomWindowMode, setCustomContent } from '@/features/bottomWindow/store/bottomWindow';
import {
  bottomWindowModeSelector,
  customContentSelector,
} from '@/features/bottomWindow/store/bottomWindow/selectors.ts';
import { CustomRender } from '@/features/bottomWindow/store/bottomWindow/types.ts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks.ts';

import { BottomWindowModes } from './useBottomWindow/types.ts';

const useBottomWindowStore = () => {
  const dispatch = useAppDispatch();

  const bottomWindowMode = useAppSelector(bottomWindowModeSelector);
  const customContent = useAppSelector(customContentSelector);

  const setBottomWindowModeHandler = useCallback(
    (mode?: BottomWindowModes) => {
      dispatch(setBottomWindowMode(mode ?? null));
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
    bottomWindowMode,
    customContent,

    setBottomWindowModeHandler,
    setCustomContentHandler,
  };
};

export default useBottomWindowStore;
