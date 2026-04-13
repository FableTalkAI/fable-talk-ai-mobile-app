import { createStackNavigator } from '@react-navigation/stack';

import ContactUsScreen from '@/features/profile/ui/screens/ContactUsScreen.tsx';
import SettingsScreen from '@/features/profile/ui/screens/SettingsScreen.tsx';

import { SettingsStackParamList } from './types.ts';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
