import { createStackNavigator } from '@react-navigation/stack';

import ContactUsScreen from '@/screens/menu/ContactUsScreen';
import PrivacyPolicyScreen from '@/screens/menu/PrivacyPolicyScreen';
import SettingsScreen from '@/screens/menu/SettingsScreen';
import TermsAndConditionsScreen from '@/screens/menu/TermsAndConditionsScreen';

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
