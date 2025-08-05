import { NavigatorScreenParams } from '@react-navigation/native';

import { ChatStackParamList } from '@/navigation/ChatStack/types.ts';
import { ProfileStackParamList } from '@/navigation/ProfileStack/types.ts';

export type TabBarNavigatorParamList = {
  Home: undefined;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};
