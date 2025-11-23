import {
  IMessage,
  InputToolbarProps as InputToolbarPropsBase,
  SendProps as SendPropsBase,
} from 'react-native-gifted-chat';

export type InputToolbarProps = {
  messageLoading: boolean;
} & InputToolbarPropsBase<IMessage>;

export type SendProps = {
  messageLoading: boolean;
} & SendPropsBase<IMessage>;
