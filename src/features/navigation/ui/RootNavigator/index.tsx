import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import CreateAgentScreen from '@/features/agents/ui/screens/CreateAgentScreen.tsx';
import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import ChatScreen from '@/features/chat/ui/screens/ChatScreen.tsx';
import SearchScreen from '@/features/home/ui/screens/SearchScreen.tsx';
import AuthStack from '@/features/navigation/ui/AuthStack';
import SettingsStack from '@/features/navigation/ui/SettingsStack';
import TabBarNavigator from '@/features/navigation/ui/TabBarNavigator';
import OnboardingScreen from '@/features/onboarding/ui/screens/OnboardingScreen';
import useProfileStore from '@/features/profile/hooks/useProfileStore.ts';
import { Theme } from '@/features/profile/store/user/types.ts';
import SubscriptionsScreen from '@/features/subscriptions/ui/screens/SubscriptionsScreen';
import useTheme from '@/shared/hooks/useTheme.ts';
import { IS_IOS } from '@/shared/model/device.ts';

import { RootNavigatorParamList } from './types.ts';

const Stack = createStackNavigator<RootNavigatorParamList>();

const RootNavigator = () => {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuthStore();
  const { profile } = useProfileStore();

  const getInitialRouteName = () => {
    if (!isLoggedIn || !profile) return 'AuthStack';
    if (!profile.isOnboardingDone) return 'Onboarding';
    return 'TabBarNavigator';
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={theme === Theme.Dark ? 'light-content' : 'dark-content'} />

      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{ headerShown: false, animation: IS_IOS ? 'default' : 'fade' }}
      >
        <Stack.Screen options={{}} name="AuthStack" component={AuthStack} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="TabBarNavigator" component={TabBarNavigator} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="CreateAgent" component={CreateAgentScreen} />
        <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
        <Stack.Screen name="SettingsStack" component={SettingsStack} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
