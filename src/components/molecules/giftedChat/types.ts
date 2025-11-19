import { ComposerProps as ComposerPropsBase } from 'react-native-gifted-chat';

export type ComposerProps = {
  backgroundColor: string;
  placeholder: string;
} & Omit<ComposerPropsBase, 'placeholder'>;
