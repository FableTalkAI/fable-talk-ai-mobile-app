import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AuthCredential = FirebaseAuthTypes.AuthCredential;

export type AuthState = {
  verifyData: VerifyData | null;
  isLoggedIn: boolean;
  loading: {
    sendOtp: boolean;
    verifyOtp: boolean;
    upsertGoogle: boolean;
  };
};

export type VerifyData = {
  email: string;
  name?: string;
};

export type SendOtpLanguages = 'uk' | 'en';

export type SendOtpRequest = {
  email: string;
  lang: SendOtpLanguages;
  name?: string;
};

export type VerifyOtpRequest = {
  email: string;
  code: string;
  name?: string;
};

export type UpsertGoogleRequest = {
  credential: AuthCredential;
  data: {
    email: string;
    name: string | null;
    photo: string | null;
  };
};
