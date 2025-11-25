import { StyleSheet, View } from 'react-native';
import { IMessage, Message as GiftedChatMessage, MessageProps } from 'react-native-gifted-chat';

import { RobotIcon } from '@/assets/icons';
import AutoImage from '@/components/atoms/AutoImage';
import { RADIUS, SPACING } from '@/core/constants/sizes.ts';
import useChatStore from '@/hooks/useChatStore.ts';

const Message = (props: MessageProps<IMessage>) => {
  // const { selectedChat } = useChatStore();

  const computedStyles = StyleSheet.create({
    container: {
      marginBottom: props.position === 'left' ? SPACING.xs : undefined,
    },
  });

  return (
    <View style={computedStyles.container}>
      {/*{!selectedChat?.chat.agentInfo.avatarUrl && (*/}
      {/*  <RobotIcon style={styles.agentAvatar} width={36} height={36} fill={'red'} />*/}
      {/*)}*/}
      <GiftedChatMessage {...props} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   agentAvatar: {
//     width: 36,
//     height: 36,
//     borderRadius: RADIUS.circle,
//   },
// });

export default Message;
