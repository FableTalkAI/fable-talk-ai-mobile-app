import { AuthStackParamList } from '@/navigation/AuthStack/types.ts';
import { ChatStackParamList } from '@/navigation/ChatStack/types.ts';
import { RootNavigatorParamList } from '@/navigation/RootNavigator/types.ts';
import { SettingsStackParamList } from '@/navigation/SettingsStack/types.ts';
import { TabBarNavigatorParamList } from '@/navigation/TabBarNavigator/types.ts';

type MergeParamLists<U> = {
  [K in U extends any ? keyof U : never]: U extends { [P in K]?: any } ? U[K] : never;
};

export type AllNavigationParamList = MergeParamLists<
  AuthStackParamList | ChatStackParamList | SettingsStackParamList | TabBarNavigatorParamList | RootNavigatorParamList
>;
