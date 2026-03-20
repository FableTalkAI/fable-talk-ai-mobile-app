import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getApps, initializeApp } from 'firebase/app';
import { useEffect } from 'react';

import { FIREBASE_CONFIG } from './constants.ts';
import { FirebaseProviderProps } from './types.ts';

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  useEffect(() => {
    try {
      if (!getApps().length) {
        initializeApp(FIREBASE_CONFIG);
        console.log('Firebase initialized');
      }
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
      });
    } catch (err) {
      console.error('FirebaseProvider init error:', err);
    }
  }, []);

  return <>{children}</>;
};

export default FirebaseProvider;
