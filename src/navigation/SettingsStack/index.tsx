import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '@/screens/main/ProfileScreen';
import ContactUsScreen from '@/screens/menu/ContactUsScreen';
import PrivacyPolicyScreen from '@/screens/menu/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '@/screens/menu/TermsAndConditionsScreen';

import { SettingsStackParamList } from './types.ts';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={ProfileScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
