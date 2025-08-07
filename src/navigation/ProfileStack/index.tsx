import { createStackNavigator } from '@react-navigation/stack';

import SettingsStack from '@/navigation/SettingsStack';
import ProfileScreen from '@/screens/main/ProfileScreen';
import SubscriptionsScreen from '@/screens/menu/SubscriptionsScreen';

import { ProfileStackParamList } from './types.ts';

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsStack} />
      <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
