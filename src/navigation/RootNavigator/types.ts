import { NavigatorScreenParams } from '@react-navigation/native';

import { AuthStackParamList } from '@/navigation/AuthStack/types.ts';
import { SettingsStackParamList } from '@/navigation/SettingsStack/types.ts';
import { TabBarNavigatorParamList } from '@/navigation/TabBarNavigator/types.ts';

export type RootNavigatorParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: undefined;
  TabBarNavigator: NavigatorScreenParams<TabBarNavigatorParamList>;
  SearchScreen: undefined;
  Subscriptions: undefined;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
  ChatScreen: undefined;
};
