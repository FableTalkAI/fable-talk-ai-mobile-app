import { Button as ReactNativeButton } from 'react-native';
import { ButtonProps } from '@/components/atoms/Button/types.ts';

const Button = ({ title }: ButtonProps) => {
  return <ReactNativeButton title={title} />;
};

export default Button;
