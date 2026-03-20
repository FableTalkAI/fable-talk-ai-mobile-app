import { StackNavigationProp } from '@react-navigation/stack';

import { AllNavigationParamList } from '@/features/navigation/hooks/useNavigationRoutes/types.ts';

export type DeleteAccountBottomWindowProps = {
  close: () => void;
  navigation: StackNavigationProp<AllNavigationParamList>;
};
