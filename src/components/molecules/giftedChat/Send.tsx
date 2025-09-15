import { StyleSheet } from 'react-native';
import { IMessage, Send as GiftedChatSend, SendProps } from 'react-native-gifted-chat';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { SendButtonIcon } from '@/assets/icons';
import { SPACING } from '@/core/constants/sizes.ts';

const Send = (props: SendProps<IMessage>) => (
  <GiftedChatSend {...props} containerStyle={styles.send}>
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <SendButtonIcon />
    </Animated.View>
  </GiftedChatSend>
);

const styles = StyleSheet.create({
  send: {
    position: 'absolute',
    right: SPACING.xl,
    bottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Send;
