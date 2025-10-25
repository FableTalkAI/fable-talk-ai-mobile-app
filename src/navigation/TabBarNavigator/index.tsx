import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatIcon, HomeIcon, ProfileIcon } from '@/assets/icons';
import { TEXT_STYLES } from '@/components/atoms/TextCustom/constants.ts';
import useTheme from '@/hooks/useTheme.ts';
import ChatListScreen from '@/screens/main/ChatListScreen';
import HomeScreen from '@/screens/main/HomeScreen.tsx';
import ProfileScreen from '@/screens/main/ProfileScreen';

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
