import useBottomWindow from '@/features/overlay/hooks/useBottomWindow';
import useModal from '@/features/overlay/hooks/useModal.ts';
import { bottomWindowRef } from '@/features/overlay/services/bottomWindowRef.ts';
import BottomWindowBase from '@/features/overlay/ui/BottomWindowBase';

import { OverlayProviderProps } from './types.ts';

const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const { templateComponent, isLocked } = useBottomWindow();
  const { modalContent } = useModal();

  return (
    <>
      {children}

      <BottomWindowBase ref={bottomWindowRef} disableClose={isLocked}>
        {templateComponent}
      </BottomWindowBase>

      {modalContent}
    </>
  );
};

export default OverlayProvider;
