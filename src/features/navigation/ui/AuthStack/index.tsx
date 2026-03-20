import { createStackNavigator } from '@react-navigation/stack';

import CodeVerificationScreen from '@/features/auth/ui/screens/CodeVerificationScreen';
import SignInUpScreen from '@/features/auth/ui/screens/SignInUpScreen';
import SplashScreen from '@/features/auth/ui/screens/SplashScreen.tsx';

import { AuthStackParamList } from './types.ts';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignInUp" component={SignInUpScreen} />
      <Stack.Screen name="CodeVerification" component={CodeVerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
