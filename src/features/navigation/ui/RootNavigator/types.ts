import { NavigatorScreenParams } from '@react-navigation/native';

import { AuthStackParamList } from '@/features/navigation/ui/AuthStack/types.ts';
import { SettingsStackParamList } from '@/features/navigation/ui/SettingsStack/types.ts';
import { TabBarNavigatorParamList } from '@/features/navigation/ui/TabBarNavigator/types.ts';

export type RootNavigatorParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: undefined;
  TabBarNavigator: NavigatorScreenParams<TabBarNavigatorParamList>;
  SearchScreen: undefined;
  Subscriptions: undefined;
  CreateAgent?: { id?: string };
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
  ChatScreen: undefined;
};
