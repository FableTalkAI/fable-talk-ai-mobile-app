import { AuthScreenMode } from '@/screens/auth/SignInUpScreen/types.ts';

export type AuthStackParamList = {
  Splash: undefined;
  SignInUp: { mode: AuthScreenMode };
  CodeVerification: undefined;
};
