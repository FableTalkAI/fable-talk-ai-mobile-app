import { createStackNavigator } from '@react-navigation/stack';

import ContactUsScreen from '@/features/profile/ui/screens/ContactUsScreen.tsx';
import PrivacyPolicyScreen from '@/features/profile/ui/screens/PrivacyPolicyScreen.tsx';
import SettingsScreen from '@/features/profile/ui/screens/SettingsScreen.tsx';
import TermsAndConditionsScreen from '@/features/profile/ui/screens/TermsAndConditionsScreen.tsx';

import { SettingsStackParamList } from './types.ts';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
