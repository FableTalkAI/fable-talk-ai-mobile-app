import { StyleSheet } from 'react-native';
import { IMessage, InputToolbar as GiftedChatInputToolBar, InputToolbarProps } from 'react-native-gifted-chat';

const InputToolbar = (props: InputToolbarProps<IMessage>) => (
  <GiftedChatInputToolBar {...props} containerStyle={styles.inputToolbar} />
);

const styles = StyleSheet.create({
  inputToolbar: {
    borderTopWidth: 0,
  },
});

export default InputToolbar;
