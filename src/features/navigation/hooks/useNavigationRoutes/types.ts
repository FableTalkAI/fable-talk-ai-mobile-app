import { AuthStackParamList } from '@/features/navigation/ui/AuthStack/types.ts';
import { RootNavigatorParamList } from '@/features/navigation/ui/RootNavigator/types.ts';
import { SettingsStackParamList } from '@/features/navigation/ui/SettingsStack/types.ts';
import { TabBarNavigatorParamList } from '@/features/navigation/ui/TabBarNavigator/types.ts';

type MergeParamLists<U> = {
  [K in U extends any ? keyof U : never]: U extends { [P in K]?: any } ? U[K] : never;
};

export type AllNavigationParamList = MergeParamLists<
  AuthStackParamList | SettingsStackParamList | TabBarNavigatorParamList | RootNavigatorParamList
>;
