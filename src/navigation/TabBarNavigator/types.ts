import { NavigatorScreenParams } from '@react-navigation/native';

import { ChatStackParamList } from '@/navigation/ChatStack/types.ts';

export type TabBarNavigatorParamList = {
  Home: undefined;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  Profile: undefined;
};
