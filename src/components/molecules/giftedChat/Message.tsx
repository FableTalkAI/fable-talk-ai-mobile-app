import { StyleSheet, View } from 'react-native';
import { IMessage, Message as GiftedChatMessage, MessageProps } from 'react-native-gifted-chat';

import { SPACING } from '@/core/constants/sizes.ts';

const Message = (props: MessageProps<IMessage>) => {
  const computedStyles = StyleSheet.create({
    container: {
      marginBottom: props.position === 'left' ? SPACING.xs : undefined,
    },
  });

  return (
    <View style={computedStyles.container}>
      <GiftedChatMessage {...props} />
    </View>
  );
};

export default Message;
