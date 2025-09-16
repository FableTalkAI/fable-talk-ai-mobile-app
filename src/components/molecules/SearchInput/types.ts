import { StackNavigationProp } from '@react-navigation/stack';

import { AllNavigationParamList } from '@/hooks/useNavigationRoutes/types.ts';

export type SearchInputProps = {
  placeholder?: string;
  onStop: (value: string) => void;
  isDisabled?: boolean;
  withFilter?: boolean;
  navigation?: StackNavigationProp<AllNavigationParamList>;
};
