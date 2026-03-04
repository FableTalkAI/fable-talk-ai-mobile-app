import { ButtonProps } from '@/shared/ui/Button/types.ts';

export type AlertProps = {
  title: string;
  subtitle: string;
  firstButtonProps: AlertButtonProps;
  secondButtonProps?: AlertButtonProps;
};

type AlertButtonProps = Omit<ButtonProps, 'containerStyle'>;
