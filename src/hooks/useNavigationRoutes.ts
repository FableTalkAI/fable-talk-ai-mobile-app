import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthStackParamList } from '@/navigation/AuthStack/types.ts';
import { ChatStackParamList } from '@/navigation/ChatStack/types.ts';
import { ProfileStackParamList } from '@/navigation/ProfileStack/types.ts';
import { RootNavigatorParamList } from '@/navigation/RootNavigator/types.ts';
import { SettingsStackParamList } from '@/navigation/SettingsStack/types.ts';
import { TabBarNavigatorParamList } from '@/navigation/TabBarNavigator/types.ts';

const useNavigationRoutes = () => {
  const authNavigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const chatNavigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
  const profileNavigation = useNavigation<StackNavigationProp<ProfileStackParamList>>();
  const settingsNavigation = useNavigation<StackNavigationProp<SettingsStackParamList>>();
  const tabBarNavigation = useNavigation<StackNavigationProp<TabBarNavigatorParamList>>();
  const rootNavigation = useNavigation<StackNavigationProp<RootNavigatorParamList>>();

  return {
    authNavigation,
    chatNavigation,
    profileNavigation,
    settingsNavigation,
    tabBarNavigation,
    rootNavigation,
  };
};

export default useNavigationRoutes;
