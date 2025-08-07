import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatStack from '@/navigation/ChatStack';
import ProfileStack from '@/navigation/ProfileStack';
import HomeScreen from '@/screens/main/HomeScreen';

import { TabBarNavigatorParamList } from './types.ts';

const Tab = createBottomTabNavigator<TabBarNavigatorParamList>();

const Index = () => (
  <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    <Tab.Screen name="ChatStack" component={ChatStack} options={{ title: 'Chat' }} />
    <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);

export default Index;
