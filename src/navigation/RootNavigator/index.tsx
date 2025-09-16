import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from '@/navigation/AuthStack';
import SettingsStack from '@/navigation/SettingsStack';
import TabBarNavigator from '@/navigation/TabBarNavigator';
import ChatScreen from '@/screens/main/ChatScreen';
import SubscriptionsScreen from '@/screens/menu/SubscriptionsScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';
import SearchScreen from '@/screens/SearchScreen';

import { RootNavigatorParamList } from './types.ts';

const Stack = createStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AuthStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="TabBarNavigator" component={TabBarNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
