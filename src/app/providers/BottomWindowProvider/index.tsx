import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import { bottomWindowRef } from '@/features/overlay/services/bottomWindowRef.ts';
import BottomWindowBase from '@/features/overlay/ui/BottomWindowBase';

import { BottomWindowProviderProps } from './types.ts';

const BottomWindowProvider = ({ children }: BottomWindowProviderProps) => {
  const { templateComponent, isLocked } = useBottomWindow();

  return (
    <>
      {children}

      <BottomWindowBase ref={bottomWindowRef} disableClose={isLocked}>
        {templateComponent}
      </BottomWindowBase>
    </>
  );
};

export default BottomWindowProvider;
