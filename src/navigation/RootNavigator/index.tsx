import { createStackNavigator } from '@react-navigation/stack';

import useAuthStore from '@/hooks/useAuthStore.ts';
import useProfileStore from '@/hooks/useProfileStore.ts';
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
  const { isLoggedIn } = useAuthStore();
  const { profile } = useProfileStore();

  const getInitialRouteName = () => {
    if (!isLoggedIn || !profile) return 'AuthStack';
    if (!profile.isOnboardingDone) return 'Onboarding';
    return 'TabBarNavigator';
  };

  return (
    <Stack.Navigator initialRouteName={getInitialRouteName()} screenOptions={{ headerShown: false }}>
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
