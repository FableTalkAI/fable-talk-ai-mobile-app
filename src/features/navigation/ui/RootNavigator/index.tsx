import { createStackNavigator } from '@react-navigation/stack';
import { SystemBars } from 'react-native-edge-to-edge';

import CreateAgentScreen from '@/features/agents/ui/screens/CreateAgentScreen.tsx';
import useAuthStore from '@/features/auth/hooks/useAuthStore.ts';
import ChatScreen from '@/features/chat/ui/screens/ChatScreen.tsx';
import CustomizationScreen from '@/features/customization/ui/screens/CustomizationScreen.tsx';
import SearchScreen from '@/features/home/ui/screens/SearchScreen.tsx';
import AuthStack from '@/features/navigation/ui/AuthStack';
import SettingsStack from '@/features/navigation/ui/SettingsStack';
import TabBarNavigator from '@/features/navigation/ui/TabBarNavigator';
import OnboardingScreen from '@/features/onboarding/ui/screens/OnboardingScreen';
import AppUpdateStub from '@/features/overlay/ui/screens/AppUpdateStub.tsx';
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
      <SystemBars hidden={{ navigationBar: true }} style={theme === Theme.Dark ? 'light' : 'dark'} />

      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{ headerShown: false, animation: IS_IOS ? 'default' : 'fade' }}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppUpdateStub" component={AppUpdateStub} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="TabBarNavigator" component={TabBarNavigator} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="CreateAgent" component={CreateAgentScreen} />
        <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
        <Stack.Screen name="Customization" component={CustomizationScreen} />
        <Stack.Screen name="SettingsStack" component={SettingsStack} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
