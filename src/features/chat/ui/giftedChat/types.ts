import { IMessage } from 'react-native-gifted-chat';
import { InputToolbarProps as InputToolbarPropsBase } from 'react-native-gifted-chat/src/InputToolbar.tsx';

export type CustomInputToolbarProps = InputToolbarPropsBase<IMessage> & {
  onSend?: (messages: Partial<IMessage>[], shouldResetInputToolbar: boolean) => void;
};