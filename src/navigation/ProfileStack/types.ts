import { NavigatorScreenParams } from '@react-navigation/native';

import { SettingsStackParamList } from '@/navigation/SettingsStack/types.ts';

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
  Subscriptions: undefined;
};
