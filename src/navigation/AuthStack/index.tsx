import { createStackNavigator } from '@react-navigation/stack';

import CodeVerificationScreen from '@/screens/auth/CodeVerificationScreen';
import SignInUpScreen from '@/screens/auth/SignInUpScreen';
import SplashScreen from '@/screens/auth/SplashScreen';

import { AuthStackParamList } from './types.ts';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SingInUp" component={SignInUpScreen} />
      <Stack.Screen name="CodeVerification" component={CodeVerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
