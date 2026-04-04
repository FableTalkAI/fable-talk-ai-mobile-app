import { useCallback, useMemo } from 'react';

import { bottomWindowRef } from '@/features/overlay/services/bottomWindowRef.ts';
import { CustomRender } from '@/features/overlay/store/overlay/types.ts';

import useBottomWindowStore from './useBottomWindowStore.ts';

const useBottomWindow = () => {
  const { setCustomContentHandler, customContent, isLocked, setIsLockedHandler } = useBottomWindowStore();

  const open = useCallback(
    (renderFn: CustomRender) => {
      setIsLockedHandler(false);
      setCustomContentHandler(renderFn);

      requestAnimationFrame(() => {
        bottomWindowRef.current?.present();
      });
    },
    [setIsLockedHandler, setCustomContentHandler],
  );

  const close = useCallback(() => {
    if (isLocked) return;
    bottomWindowRef.current?.dismiss();
  }, [isLocked]);

  const templateComponent = useMemo(() => {
    if (typeof customContent === 'function') {
      return customContent(close);
    }
    return null;
  }, [customContent, close]);

  return {
    templateComponent,
    open,
    close,
    isLocked,
  };
};

export default useBottomWindow;
