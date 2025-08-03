import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '@/screens/auth/SplashScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
