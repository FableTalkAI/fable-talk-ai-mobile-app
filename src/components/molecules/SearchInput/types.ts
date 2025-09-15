import { StackNavigationProp } from '@react-navigation/stack';

import { AllNavigationParamList } from '@/hooks/useNavigationRoutes/types.ts';

export type SearchInputProps = {
  onStop: (value: string) => void;
  placeholder?: string;
  withFilter?: boolean;
  navigation?: StackNavigationProp<AllNavigationParamList>;
};
