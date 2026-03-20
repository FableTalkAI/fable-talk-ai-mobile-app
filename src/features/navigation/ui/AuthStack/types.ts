import { AuthScreenMode } from '@/features/auth/ui/screens/SignInUpScreen/types.ts';

export type AuthStackParamList = {
  Splash: undefined;
  SignInUp: { mode: AuthScreenMode };
  CodeVerification: undefined;
};
