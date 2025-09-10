import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ChatIcon, HomeIcon, ProfileIcon } from '@/assets/icons';
import { TEXT_STYLES } from '@/components/atoms/TextCustom/constants.ts';
import useTheme from '@/hooks/useTheme.ts';
import ChatStack from '@/navigation/ChatStack';
import ProfileStack from '@/navigation/ProfileStack';
import HomeScreen from '@/screens/main/HomeScreen';

import { TabBarNavigatorParamList } from './types.ts';

const Tab = createBottomTabNavigator<TabBarNavigatorParamList>();

const Index = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.iconPrimary,
        tabBarInactiveTintColor: colors.gray40,
        tabBarLabelStyle: {
          ...TEXT_STYLES.base,
        },
        tabBarStyle: {
          height: 70,
          paddingTop: 5,
          backgroundColor: colors.backgroundBase,
        },
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
        name="ChatStack"
        component={ChatStack}
        options={{
          title: 'Chat',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <ChatIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Profile',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <ProfileIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Index;
