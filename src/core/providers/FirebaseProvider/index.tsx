import { getApps, initializeApp } from 'firebase/app';
import { useEffect } from 'react';

import { FIREBASE_CONFIG } from './constants.ts';
import { FirebaseProviderProps } from './types.ts';

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  useEffect(() => {
    if (!getApps().length) {
      initializeApp(FIREBASE_CONFIG);
    }
  }, []);

  return <>{children}</>;
};

export default FirebaseProvider;
