import { StyleSheet } from 'react-native';
import { IMessage, Send as GiftedChatSend } from 'react-native-gifted-chat';
import { SendProps as SendPropsBase } from 'react-native-gifted-chat/src/Send.tsx';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import useChatStore from '@/features/chat/hooks/useChatStore.ts';
import { SendButtonIcon } from '@/shared/assets/icons';
import useTheme from '@/shared/hooks/useTheme.ts';
import { SPACING } from '@/shared/model/sizes.ts';

const Send = (props: SendPropsBase<IMessage>) => {
  const { colors } = useTheme();
  const { selectedChat } = useChatStore();

  return (
    <GiftedChatSend
      {...props}
      sendButtonProps={{ enabled: !selectedChat?.isSending }}
      isSendButtonAlwaysVisible={!selectedChat?.isSending}
      containerStyle={[styles.send]}
    >
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <SendButtonIcon fill={colors.iconPrimary} />
      </Animated.View>
    </GiftedChatSend>
  );
};

const styles = StyleSheet.create({
  send: {
    right: SPACING.xl,
    position: 'absolute',
    bottom: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Send;
