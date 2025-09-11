import { ButtonProps } from '@/components/atoms/Button/types.ts';

export type AlertProps = {
  title: string;
  subtitle: string;
  firstButtonProps: AlertButtonProps;
  secondButtonProps?: AlertButtonProps;
};

type AlertButtonProps = Omit<ButtonProps, 'containerStyle'>;
