import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import ChatListScreen from '@/features/chat/ui/screens/ChatListScreen';
import HomeScreen from '@/features/home/ui/screens/HomeScreen.tsx';
import ProfileScreen from '@/features/profile/ui/screens/ProfileScreen.tsx';
import { ChatIcon, HomeIcon, ProfileIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme';
import { TEXT_STYLES } from '@/shared/ui/TextCustom/constants.ts';

import { TabBarNavigatorParamList } from './types.ts';

const Tab = createMaterialTopTabNavigator<TabBarNavigatorParamList>();

const Index = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors.backgroundBase,
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: colors.iconPrimary,
        tabBarInactiveTintColor: colors.gray40,
        tabBarLabelStyle: TEXT_STYLES.base,
        tabBarIndicatorStyle: styles.tabBarIndicator,
        tabBarItemStyle: [computedStyles.tabBar, styles.tabBar],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('tabBar.home'),
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{
          title: t('tabBar.chat'),
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <ChatIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('tabBar.profile'),
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color }) => <ProfileIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 20,
    height: 80,
  },
  tabBarIndicator: {
    backgroundColor: 'transparent',
  },
});

export default Index;
