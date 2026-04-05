import { NavigationContainer } from '@react-navigation/native';

import { flushPendingNavigation, navigationRef } from '@/features/navigation/lib/navigationRef.ts';
import useModal from '@/features/overlay/hooks/useModal.ts';

import { NavigationProviderProps } from './types.ts';

const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const { closeModal } = useModal();

  return (
    <NavigationContainer ref={navigationRef} onReady={flushPendingNavigation} onStateChange={closeModal}>
      {children}
    </NavigationContainer>
  );
};

export default NavigationProvider;
