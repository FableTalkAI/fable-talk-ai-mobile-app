import { StackNavigationProp } from '@react-navigation/stack';

import { AllNavigationParamList } from '@/features/navigation/hooks/useNavigationRoutes/types.ts';

export type LogoutBottomWindowProps = {
  close: () => void;
  navigation: StackNavigationProp<AllNavigationParamList>;
};
