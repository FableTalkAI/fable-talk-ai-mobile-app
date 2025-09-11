import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from '@/navigation/AuthStack';
import TabBarNavigator from '@/navigation/TabBarNavigator';
import OnboardingScreen from '@/screens/OnboardingScreen';
import SearchScreen from '@/screens/SearchScreen';

import { RootNavigatorParamList } from './types.ts';

const Stack = createStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TabBarNavigator" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="TabBarNavigator" component={TabBarNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
