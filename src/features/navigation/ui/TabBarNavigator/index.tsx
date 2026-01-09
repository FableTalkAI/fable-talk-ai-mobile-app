import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatListScreen from '@/features/chat/ui/screens/ChatListScreen';
import HomeScreen from '@/features/home/ui/screens/HomeScreen.tsx';
import ProfileScreen from '@/features/profile/ui/screens/ProfileScreen.tsx';
import { ChatIcon, HomeIcon, ProfileIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { TEXT_STYLES } from '@/shared/ui/TextCustom/constants.ts';

import { TabBarNavigatorParamList } from './types.ts';

const Tab = createBottomTabNavigator<TabBarNavigatorParamList>();

const Index = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const computedStyles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors.backgroundBase,
      height: insets.bottom === 0 ? 70 : 90,
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.iconPrimary,
        tabBarInactiveTintColor: colors.gray40,
        tabBarLabelStyle: TEXT_STYLES.base,
        tabBarStyle: [computedStyles.tabBar, styles.tabBar],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{
          title: 'Chat',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <ChatIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <ProfileIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 10,
  },
});

export default Index;
