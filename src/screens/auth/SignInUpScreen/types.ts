import { RouteProp } from '@react-navigation/native';

import { AuthStackParamList } from '@/navigation/AuthStack/types.ts';

export type SignInUpRouteProp = RouteProp<AuthStackParamList, 'SignInUp'>;

export enum AuthScreenMode {
  SignIn = 'signIn',
  SignUp = 'signUp',
}
