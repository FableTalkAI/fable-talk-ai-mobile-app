import useBottomWindow from '@/features/bottomWindow/hooks/useBottomWindow';
import { bottomWindowRef } from '@/features/bottomWindow/services/bottomWindowRef.ts';
import BottomWindowBase from '@/features/bottomWindow/ui/BottomWindowBase';

import { BottomWindowProviderProps } from './types.ts';

const BottomWindowProvider = ({ children }: BottomWindowProviderProps) => {
  const { templateComponent, disableClose } = useBottomWindow();

  return (
    <>
      {children}

      <BottomWindowBase ref={bottomWindowRef} disableClose={disableClose}>
        {templateComponent}
      </BottomWindowBase>
    </>
  );
};

export default BottomWindowProvider;
