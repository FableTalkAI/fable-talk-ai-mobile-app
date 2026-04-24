import { ReactNode } from 'react';

export type GoogleButtonProps = {
  isLoading: boolean;
  icon?: ReactNode;
  onPress?: () => void;
};
