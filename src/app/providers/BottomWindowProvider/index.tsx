import useBottomWindow from '@/features/bottomWindow/hooks/useBottomWindow';

import { BottomWindowProviderProps } from './types.ts';

const BottomWindowProvider = ({ children }: BottomWindowProviderProps) => {
  const { BottomWindow } = useBottomWindow();

  return (
    <>
      {children}
      <BottomWindow />
    </>
  );
};

export default BottomWindowProvider;
